const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');

type FacultyData = {
  name: string;
  majors: MajorData[];
};

type MajorData = {
  name: string;
  prefix: string;
};

function generateGroupCodes(prefix: string, count: number): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomNumber =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    codes.push(`${prefix}${randomNumber}`);
  }
  return codes;
}
async function main() {
  // #region -------------- create roles ----------------
  const roles = [
    { name: 'Student' },
    { name: 'Supervisor' },
    { name: 'Deans' },
    { name: 'Admin' },
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
      username: 'university_admin',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role_id: universityAdminRoleId,
      password: await argon2.hash('password'),
      created_at: new Date(),
    },
  });
  // #endregion -------------- create user ----------------

  // #region -------------- create faculties and majors ----------------
  const faculties: FacultyData[] = [
    {
      name: 'Engineering',
      majors: [
        { name: 'Mechanical Engineering', prefix: 'ME' },
        { name: 'Aerospace Engineering', prefix: 'AE' },
        { name: 'Electrical Engineering', prefix: 'EE' },
      ],
    },
    {
      name: 'Business',
      majors: [
        { name: 'Finance', prefix: 'FI' },
        { name: 'Marketing', prefix: 'MK' },
        { name: 'Accounting', prefix: 'AC' },
      ],
    },
    {
      name: 'Arts & Sciences',
      majors: [
        { name: 'Biology', prefix: 'BI' },
        { name: 'Chemistry', prefix: 'CH' },
        { name: 'Physics', prefix: 'PH' },
      ],
    },
    {
      name: 'Law',
      majors: [
        { name: 'Criminal Law', prefix: 'CL' },
        { name: 'Corporate Law', prefix: 'CO' },
        { name: 'International Law', prefix: 'IL' },
      ],
    },
    {
      name: 'Medicine',
      majors: [
        { name: 'General Medicine', prefix: 'GM' },
        { name: 'Pediatrics', prefix: 'PD' },
        { name: 'Psychiatry', prefix: 'PY' },
      ],
    },
    {
      name: 'Information Technology',
      majors: [
        { name: 'Computer Science', prefix: 'CS' },
        { name: 'Information Systems', prefix: 'IS' },
        { name: 'Cyber Security', prefix: 'CY' },
      ],
    },
    {
      name: 'Environmental Science',
      majors: [
        { name: 'Environmental Science', prefix: 'ES' },
        { name: 'Conservation Science', prefix: 'CS' },
        { name: 'Wildlife Science', prefix: 'WS' },
      ],
    },
    {
      name: 'Education',
      majors: [
        { name: 'Early Childhood Education', prefix: 'EC' },
        { name: 'Primary Education', prefix: 'PE' },
        { name: 'Secondary Education', prefix: 'SE' },
      ],
    },
  ];

  for (const faculty of faculties) {
    const createdFaculty = await prisma.faculties.create({
      data: { name: faculty.name },
    });

    for (const major of faculty.majors) {
      const createdMajor = await prisma.majors.create({
        data: {
          name: major.name,
          faculty_id: createdFaculty.id,
        },
      });

      const generatedGroups = await generateGroupCodes(major.prefix, 5); // Generates 5 groups per major
      for (const groupName of generatedGroups) {
        await prisma.groups.create({
          data: {
            name: groupName,
            major_id: createdMajor.id,
          },
        });
      }
    }
  }
  // #endregion -------------- create faculties and majors ----------------
  // #region -------------- create keywords ----------------
  const keywords = [
    { name: 'Programming', faculty_id: 6 },
    { name: 'Web Development', faculty_id: 6 },
    { name: 'Data Science', faculty_id: 6 },
    { name: 'Machine Learning', faculty_id: 6 },
    { name: 'Artificial Intelligence', faculty_id: 6 },
    { name: 'Cyber Security', faculty_id: 6 },
    { name: 'Networking', faculty_id: 6 },
    { name: 'Database Management', faculty_id: 6 },
    { name: 'Cloud Computing', faculty_id: 6 },
    { name: 'Mobile Development', faculty_id: 6 },
    { name: 'Game Development', faculty_id: 6 },
    { name: 'Embedded Systems', faculty_id: 6 },
    { name: 'IoT', faculty_id: 6 },
    { name: 'Robotics', faculty_id: 6 },
    { name: 'Automation', faculty_id: 6 },
    { name: 'Blockchain', faculty_id: 6 },
    { name: 'Quantum Computing', faculty_id: 6 },
    { name: 'Big Data', faculty_id: 6 },
    { name: 'DevOps', faculty_id: 6 },
    { name: 'Testing', faculty_id: 6 },
    { name: 'Agile', faculty_id: 6 },
    { name: 'Scrum', faculty_id: 6 },
    { name: 'Kanban', faculty_id: 2 },
    { name: 'Management', faculty_id: 2 },
    { name: 'Leadership', faculty_id: 2 },
    { name: 'Entrepreneurship', faculty_id: 2 },
    { name: 'Business Analysis', faculty_id: 2 },
    { name: 'Finance', faculty_id: 2 },
    { name: 'Marketing', faculty_id: 2 },
    { name: 'Accounting', faculty_id: 2 },
    { name: 'Economics', faculty_id: 2 },
    { name: 'Law', faculty_id: 4 },
    { name: 'Criminal Law', faculty_id: 4 },
    { name: 'Corporate Law', faculty_id: 4 },
    { name: 'International Law', faculty_id: 4 },
    { name: 'Health Law', faculty_id: 4 },
    { name: 'Family Law', faculty_id: 4 },
    { name: 'Civil Law', faculty_id: 4 },
    { name: 'Property Law', faculty_id: 4 },
    { name: 'Environmental Law', faculty_id: 4 },
    { name: 'Human Rights Law', faculty_id: 4 },
  ];

  for (const keyword of keywords) {
    await prisma.keywords.create({
      data: {
        name: keyword.name,
        faculty: { connect: { id: keyword.faculty_id } },
      },
    });
  }
  // #endregion -------------- create keywords ----------------
  // #region -------------- create thesis status ----------------
  const thesisStatus = [
    { name: 'Proposed' },
    { name: 'Revision' },
    { name: 'Rejected' },
    { name: 'Approve' },
  ];
  for (const status of thesisStatus) {
    await prisma.status.create({
      data: status,
    });
  }
  // #endregion -------------- create thesis status ----------------
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
