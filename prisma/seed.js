import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Create States
  const states = await prisma.state.createMany({
    data: [
      { name: "Lagos" },
      { name: "Abuja" },
      { name: "Kano" },
    ],
    skipDuplicates: true,
  });

  // 2️⃣ Create LGAs for each state
  const lagos = await prisma.state.findUnique({ where: { name: "Lagos" } });
  const abuja = await prisma.state.findUnique({ where: { name: "Abuja" } });
  const kano = await prisma.state.findUnique({ where: { name: "Kano" } });

  await prisma.lGA.createMany({
    data: [
      { name: "Ikeja", stateId: lagos.id },
      { name: "Surulere", stateId: lagos.id },
      { name: "Gwagwalada", stateId: abuja.id },
      { name: "Kuje", stateId: abuja.id },
      { name: "Nassarawa", stateId: kano.id },
      { name: "Tarauni", stateId: kano.id },
    ],
    skipDuplicates: true,
  });

  // 3️⃣ Fetch LGAs
  const ikeja = await prisma.lGA.findFirst({ where: { name: "Ikeja" } });
  const gwagwalada = await prisma.lGA.findFirst({ where: { name: "Gwagwalada" } });
  const nassarawa = await prisma.lGA.findFirst({ where: { name: "Nassarawa" } });

  // 4️⃣ Create Doctors
  const doctors = [
    {
      name: "Dr. John Doe",
      email: "johndoe@example.com",
      phoneNumber: "08011111111",
      specialization: "Cardiology",
      stateId: lagos.id,
      lgaId: ikeja.id,
    },
    {
      name: "Dr. Jane Smith",
      email: "janesmith@example.com",
      phoneNumber: "08022222222",
      specialization: "Neurology",
      stateId: abuja.id,
      lgaId: gwagwalada.id,
    },
    {
      name: "Dr. Ahmed Musa",
      email: "ahmedmusa@example.com",
      phoneNumber: "08033333333",
      specialization: "Pediatrics",
      stateId: kano.id,
      lgaId: nassarawa.id,
    },
  ];

  for (const doc of doctors) {
    const hashedPassword = await bcrypt.hash(doc.phoneNumber, 10);
    await prisma.user.upsert({
      where: { email: doc.email },
      update: {},
      create: {
        ...doc,
        password: hashedPassword,
        role: "DOCTOR",
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
