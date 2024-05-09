/*
  Warnings:

  - You are about to drop the `announcement_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `announcements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "announcement_roles" DROP CONSTRAINT "announcement_roles_announcement_id_fkey";

-- DropForeignKey
ALTER TABLE "announcement_roles" DROP CONSTRAINT "announcement_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "announcements" DROP CONSTRAINT "announcements_user_id_fkey";

-- DropTable
DROP TABLE "announcement_roles";

-- DropTable
DROP TABLE "announcements";

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userGroup" (
    "education_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "userGroup_pkey" PRIMARY KEY ("education_id","group_id")
);

-- AddForeignKey
ALTER TABLE "userGroup" ADD CONSTRAINT "userGroup_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "education_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGroup" ADD CONSTRAINT "userGroup_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
