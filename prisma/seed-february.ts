import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function randomOrderNumber(): string {
  return `#${Math.floor(1000 + Math.random() * 9000)}`;
}

const customers = [
  {
    name: "Nguyễn Thị Mai",
    phone: "0901234567",
    address: "12 Lê Lợi, Q.1, TP.HCM",
  },
  {
    name: "Trần Văn Hùng",
    phone: "0912345678",
    address: "45 Nguyễn Huệ, Q.1, TP.HCM",
  },
  {
    name: "Phạm Thị Lan",
    phone: "0923456789",
    address: "78 Hai Bà Trưng, Q.3, TP.HCM",
  },
  {
    name: "Lê Quang Minh",
    phone: "0934567890",
    address: "23 Đinh Tiên Hoàng, Q.Bình Thạnh",
  },
  {
    name: "Hoàng Thị Thu",
    phone: "0945678901",
    address: "56 Lý Thường Kiệt, Q.10, TP.HCM",
  },
  {
    name: "Vũ Đức Nam",
    phone: "0956789012",
    address: "89 Cách Mạng Tháng 8, Q.3, TP.HCM",
  },
  {
    name: "Đặng Thị Hoa",
    phone: "0967890123",
    address: "34 Bùi Viện, Q.1, TP.HCM",
  },
  {
    name: "Bùi Văn Khải",
    phone: "0978901234",
    address: "67 Võ Văn Tần, Q.3, TP.HCM",
  },
];

const products = [
  { name: "Mít sấy khô 500g", amount: 85000 },
  { name: "Dừa sấy giòn 300g", amount: 65000 },
  { name: "Xoài sấy dẻo 400g", amount: 75000 },
  { name: "Chuối sấy khô 500g", amount: 55000 },
  { name: "Khoai lang sấy 400g", amount: 60000 },
  { name: "Ổi sấy giòn 300g", amount: 70000 },
  { name: "Nhãn sấy khô 500g", amount: 90000 },
  { name: "Bơ sấy giòn 200g", amount: 110000 },
  { name: "Combo trái cây sấy 1kg", amount: 220000 },
  { name: "Mãng cầu sấy 400g", amount: 95000 },
];

async function main() {
  console.log("🌱 Seeding February 2026 orders...\n");

  // Feb 1 → Feb 24 (today), all UTC
  const feb2026Start = new Date("2026-02-01T00:00:00.000Z");
  const feb2026End = new Date("2026-02-24T16:38:00.000Z");

  const seedOrders = Array.from({ length: 20 }, (_, i) => {
    const customer = customers[i % customers.length];
    const product = products[i % products.length];
    const createdAt = randomDate(feb2026Start, feb2026End);

    return {
      orderNumber: randomOrderNumber(),
      customerName: customer.name,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      productName: product.name,
      amount: product.amount,
      status: "paid",
      isDeleted: false,
      createdAt,
      updatedAt: createdAt,
    };
  });

  // Ensure unique order numbers
  const usedNumbers = new Set<string>();
  for (const order of seedOrders) {
    while (usedNumbers.has(order.orderNumber)) {
      order.orderNumber = randomOrderNumber();
    }
    usedNumbers.add(order.orderNumber);
  }

  let created = 0;
  for (const order of seedOrders) {
    await prisma.order.create({ data: order });
    console.log(
      `  ✅ Created order ${order.orderNumber} — ${order.customerName} — ${order.productName} — ${order.amount.toLocaleString("vi-VN")} VNĐ — ${order.createdAt.toLocaleDateString("vi-VN")}`,
    );
    created++;
  }

  console.log(`\n🎉 Done! Seeded ${created} orders for February 2026.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
