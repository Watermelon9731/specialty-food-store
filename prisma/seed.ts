import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Categories
  const fruits = await prisma.category.upsert({
    where: { name: "Dried Fruits" },
    update: {},
    create: { name: "Dried Fruits" },
  });

  const nuts = await prisma.category.upsert({
    where: { name: "Nuts" },
    update: {},
    create: { name: "Nuts" },
  });

  const spices = await prisma.category.upsert({
    where: { name: "Spices" },
    update: {},
    create: { name: "Spices" },
  });

  const herbs = await prisma.category.upsert({
    where: { name: "Herbs" },
    update: {},
    create: { name: "Herbs" },
  });

  console.log("Created categories");

  // Products
  const products = [
    {
      sku: "MANGO-100",
      name: "Organic Dried Mango",
      description: "Sweet and tangy dried mango slices without added sugar.",
      pricePerUnit: 5.99,
      unitType: "100g",
      stockQuantity: 50,
      origin: "Vietnam",
      shelfLifeDays: 365,
      categoryId: fruits.id,
    },
    {
      sku: "FIGS-250",
      name: "Turkish Figs",
      description: "Plump and sweet sun-dried figs.",
      pricePerUnit: 8.5,
      unitType: "250g",
      stockQuantity: 40,
      origin: "Turkey",
      shelfLifeDays: 180,
      categoryId: fruits.id,
    },
    {
      sku: "ALMOND-500",
      name: "Roasted Almonds",
      description: "Crunchy roasted almonds, lightly salted.",
      pricePerUnit: 12.5,
      unitType: "500g",
      stockQuantity: 30,
      origin: "California, USA",
      shelfLifeDays: 365,
      categoryId: nuts.id,
    },
    {
      sku: "CASHEW-200",
      name: "Raw Cashews",
      description: "Creamy and sweet raw cashew nuts.",
      pricePerUnit: 9.0,
      unitType: "200g",
      stockQuantity: 60,
      origin: "Vietnam",
      shelfLifeDays: 270,
      categoryId: nuts.id,
    },
    {
      sku: "SAFFRON-1",
      name: "Premium Saffron Threads",
      description: "High quality saffron for culinary use.",
      pricePerUnit: 15.0,
      unitType: "1g",
      stockQuantity: 100,
      origin: "Spain",
      shelfLifeDays: 730,
      categoryId: spices.id,
    },
    {
      sku: "CINNAMON-50",
      name: "Cinnamon Sticks",
      description: "Aromatic cinnamon sticks for baking and tea.",
      pricePerUnit: 4.5,
      unitType: "50g",
      stockQuantity: 80,
      origin: "Sri Lanka",
      shelfLifeDays: 730,
      categoryId: spices.id,
    },
    {
      sku: "BASIL-20",
      name: "Dried Basil Lists",
      description: "Aromatic dried basil leaves.",
      pricePerUnit: 3.5,
      unitType: "20g",
      stockQuantity: 80,
      origin: "Egypt",
      shelfLifeDays: 365,
      categoryId: herbs.id,
    },
  ];

  const dbProducts = [];
  for (const product of products) {
    const p = await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
    dbProducts.push(p);
  }

  console.log(`Seeded ${products.length} products`);

  // Create Orders using those products
  const orders = [
    {
      orderNumber: "#1001",
      customerName: "Nguyễn Văn A",
      customerPhone: "0901234567",
      customerAddress: "123 Lê Lợi, TP.HCM",
      productName: dbProducts[0].name,
      productId: dbProducts[0].id,
      amount: 150000,
      status: "paid",
      isDeleted: false,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      orderNumber: "#1002",
      customerName: "Trần Thị B",
      customerPhone: "0987654321",
      customerAddress: "456 Nguyễn Trãi, Hà Nội",
      productName: dbProducts[1].name,
      productId: dbProducts[1].id,
      amount: 450000,
      status: "processing",
      isDeleted: false,
      createdAt: new Date(new Date().setHours(new Date().getHours() - 3)),
    },
    {
      orderNumber: "#1003",
      customerName: "Lê Cường",
      customerPhone: "091223344",
      customerAddress: "789 Hùng Vương, Đà Nẵng",
      productName: dbProducts[3].name,
      productId: dbProducts[3].id,
      amount: 980000,
      status: "unfulfilled",
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      orderNumber: "#1004",
      customerName: "Hoàng Ngân",
      customerPhone: "0933112233",
      customerAddress: "10/2 Khu phố 1, Bình Dương",
      productName: dbProducts[2].name,
      productId: dbProducts[2].id,
      amount: 555000,
      status: "paid",
      isDeleted: false,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    },
  ];

  for (const order of orders) {
    await prisma.order.upsert({
      where: { orderNumber: order.orderNumber },
      update: {},
      create: order,
    });
  }

  console.log(`Seeded ${orders.length} orders`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
