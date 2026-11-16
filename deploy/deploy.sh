#!/usr/bin/env bash
# Chạy TRÊN VM (GitHub Action gọi qua SSH sau khi rsync source vào $SRC).
# Build trong $SRC, rồi mới copy bản standalone sang $APP -> site cũ vẫn chạy trong lúc build.
set -euo pipefail

BASE=/opt/trebinhdinh
SRC=$BASE/src
APP=$BASE/app

cd "$SRC"
cp "$BASE/.env" .env # NEXT_PUBLIC_* được nhúng lúc build

yarn install --frozen-lockfile
yarn build

# standalone không tự kèm public/ và .next/static
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

rsync -a --delete .next/standalone/ "$APP/"
sudo systemctl restart trebinhdinh

# Chờ server lên, fail deploy nếu không lên được
for _ in $(seq 1 20); do
  if curl -fsS -o /dev/null http://127.0.0.1:3000/; then
    echo "Deploy OK"
    exit 0
  fi
  sleep 1
done
echo "Server không phản hồi sau restart" >&2
sudo journalctl -u trebinhdinh -n 50 --no-pager >&2
exit 1
