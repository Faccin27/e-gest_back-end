const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

function generateCPF() {
  const numbers = Array.from({ length: 9 }, () => faker.number.int(9));
  const d1 = numbers.reduce((sum, num, i) => sum + num * (10 - i), 0) % 11;
  numbers.push(d1 < 2 ? 0 : 11 - d1);
  const d2 = numbers.reduce((sum, num, i) => sum + num * (11 - i), 0) % 11;
  numbers.push(d2 < 2 ? 0 : 11 - d2);
  const cpfString = numbers.join('').padStart(11, '0');
  
  return cpfString;
}

function generateCEP() {
  return faker.number.int({max: 1000});
}

async function main() {
  for (let i = 0; i < 10; i++) {
    const client = await prisma.clients.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        sexo: faker.helpers.arrayElement(['Masculino', 'Feminino']),
        pfp: faker.image.avatar(),
        cpf: generateCPF(),
        birth: faker.date.past({ years: 80 }),
        Address: {
          create: {
            cep: generateCEP(),
            city: faker.location.city(),
            street: faker.location.street(),
            state: faker.location.state(),
            number: faker.number.int({ min: 1, max: 9999 }),
            neighboorhood: faker.location.streetAddress(),
          }
        }
      },
    });
    console.log(`Created client: ${client.name}`);
  }
}

main()
  .then(async () => {
    console.log('Data generation completed successfully');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during data generation:', e);
    await prisma.$disconnect();
    process.exit(1);
  });