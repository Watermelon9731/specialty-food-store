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

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products`);
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
