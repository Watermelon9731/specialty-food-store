# Deploy lên Oracle VM

Luồng: `Cloudflare (proxy + cache static) -> Caddy :443 -> Next.js standalone 127.0.0.1:3000 (systemd)`.
Push lên `main` -> GitHub Action rsync source lên VM -> `deploy/deploy.sh` build + restart.

| File | Đặt ở VM |
|---|---|
| `deploy/trebinhdinh.service` | `/etc/systemd/system/trebinhdinh.service` |
| `deploy/Caddyfile` | `/etc/caddy/Caddyfile` |
| `.env` (bản production) | `/opt/trebinhdinh/.env` |

## 1. Tạo VM
- Region: **Singapore (ap-singapore-1)**, nên cùng region với Supabase (kiểm tra ở Supabase > Project Settings > General).
- Shape: `VM.Standard.A1.Flex` (ARM), 2 OCPU / 12GB là dư. **Không dùng** shape micro 1GB, build Next.js sẽ hết RAM.
- Image: Ubuntu 24.04. Thêm SSH public key của bạn.

## 2. Mở port 80/443
- Oracle Console > VCN > Security List: thêm Ingress TCP `80`, `443` từ `0.0.0.0/0`.
- Image Ubuntu của Oracle còn chặn bằng iptables, phải mở thêm:
```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

## 3. Cài Node 22, yarn, Caddy, rsync
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs rsync debian-keyring debian-archive-keyring apt-transport-https curl
sudo npm i -g yarn@1
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update && sudo apt-get install -y caddy
```

## 4. User deploy + thư mục
```bash
sudo useradd -m -s /bin/bash deploy
sudo mkdir -p /opt/trebinhdinh/{src,app}
sudo chown -R deploy:deploy /opt/trebinhdinh
# cho phép deploy restart service mà không cần mật khẩu
echo 'deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart trebinhdinh, /usr/bin/journalctl -u trebinhdinh *' | sudo tee /etc/sudoers.d/trebinhdinh
```
Tạo cặp SSH key riêng cho GitHub Action (trên máy bạn):
```bash
ssh-keygen -t ed25519 -f gh-deploy -N "" -C gh-deploy
```
Thêm nội dung `gh-deploy.pub` vào `/home/deploy/.ssh/authorized_keys` trên VM (chmod 700 thư mục `.ssh`, 600 file).

## 5. File .env production
Copy `.env` lên `/opt/trebinhdinh/.env`, `chmod 600`, owner `deploy`. Giữ nguyên các biến hiện dùng trên Netlify.

## 6. systemd
```bash
sudo cp trebinhdinh.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable trebinhdinh
```
(Chưa start, lần deploy đầu sẽ start.)

## 7. Cloudflare + Caddy
1. Thêm domain `trebinhdinh.com` vào Cloudflare (free), đổi nameserver ở nhà đăng ký domain.
2. DNS: `A trebinhdinh.com -> IP VM` và `A www -> IP VM`, cả hai **Proxied** (mây cam).
3. SSL/TLS mode: **Full (strict)**.
4. SSL/TLS > Origin Server > Create Certificate (15 năm). Lưu vào VM:
   `/etc/caddy/cf-origin.pem`, `/etc/caddy/cf-origin.key` (owner `caddy`, chmod 600 cho key).
5. `sudo cp Caddyfile /etc/caddy/Caddyfile && sudo systemctl reload caddy`
6. (Thay rate-limit của `netlify.toml`) Security > WAF > Rate limiting rules: path chứa `/tin-tuc` hoặc `/blog`, ~120 req/phút/IP -> Block. Rate-limit trong `src/middleware.ts` vẫn chạy song song.

## 8. GitHub secrets
Repo > Settings > Secrets and variables > Actions:

| Secret | Giá trị |
|---|---|
| `VM_HOST` | IP public của VM |
| `VM_USER` | `deploy` |
| `VM_SSH_KEY` | nội dung file `gh-deploy` (private key) |
| `VM_KNOWN_HOSTS` | output của `ssh-keyscan <IP VM>` |

## 9. Deploy lần đầu + kiểm tra trước khi đổi DNS
- Actions > "Deploy to Oracle VM" > Run workflow.
- Test trên VM: `curl -I http://127.0.0.1:3000/`
- Nếu DNS chưa trỏ qua Cloudflare, có thể test origin trực tiếp: `curl -kI --resolve trebinhdinh.com:443:<IP VM> https://trebinhdinh.com/`

## 10. Sau khi chạy ổn
- Tắt deploy trên Netlify, xoá `netlify.toml`.
- Cron keep-alive Supabase (`/api/cron/keep-alive`) vẫn dùng URL cũ, dịch vụ cron ngoài không cần đổi.

## Xử lý sự cố
```bash
sudo journalctl -u trebinhdinh -f     # log Next.js
sudo journalctl -u caddy -f           # log Caddy
```
