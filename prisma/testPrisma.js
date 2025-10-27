const prisma = require('./prismaClient');

async function test() {
  try {
    const states = await prisma.state.findMany();
    console.log('States:', states);

    const lgas = await prisma.lga.findMany();
    console.log('LGAs:', lgas);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
