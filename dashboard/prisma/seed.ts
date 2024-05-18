const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");

async function main() {
  // #region -------------- create roles ----------------
  const roles = [
    { name: "Student" },
    { name: "Supervisor" },
    { name: "Deans" },
    { name: "Admin" },
  ];

  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });
  }
  // #endregion -------------- create roles ----------------

  const universityAdminRoleId = 4;

  // #region -------------- create user ----------------
  await prisma.users.create({
    data: {
      username: "kontol",
      name: "John Doe",
      email: "john.doe@example.com",
      role_id: universityAdminRoleId,
      password: await argon2.hash("password"),
      created_at: new Date(),
    },
  });
  // #endregion -------------- create user ----------------
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
