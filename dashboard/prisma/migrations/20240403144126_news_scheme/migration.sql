/*
  Warnings:

  - You are about to drop the column `education_entry_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `education_entry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supervisor_recomendation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_group` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[comments_id]` on the table `student_proposal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_registration_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "education_entry" DROP CONSTRAINT "education_entry_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "proposal" DROP CONSTRAINT "proposal_comments_id_fkey";

-- DropForeignKey
ALTER TABLE "student_proposal" DROP CONSTRAINT "student_proposal_user_id_fkey";

-- DropForeignKey
ALTER TABLE "supervisor_recomendation" DROP CONSTRAINT "supervisor_recomendation_proposal_id_fkey";

-- DropForeignKey
ALTER TABLE "supervisor_recomendation" DROP CONSTRAINT "supervisor_recomendation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_group" DROP CONSTRAINT "user_group_education_id_fkey";

-- DropForeignKey
ALTER TABLE "user_group" DROP CONSTRAINT "user_group_group_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_education_entry_id_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "student_proposal_id" INTEGER,
ADD COLUMN     "supervisor_recomendation_proposal_id" INTEGER;

-- AlterTable
ALTER TABLE "student_proposal" ADD COLUMN     "comments_id" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "education_entry_id",
ADD COLUMN     "education_proposal_id" INTEGER,
ADD COLUMN     "user_registration_id" INTEGER;

-- DropTable
DROP TABLE "education_entry";

-- DropTable
DROP TABLE "faculty";

-- DropTable
DROP TABLE "group";

-- DropTable
DROP TABLE "supervisor_recomendation";

-- DropTable
DROP TABLE "user_group";

-- CreateTable
CREATE TABLE "user_registration" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "user_registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_proposal" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "education_proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "faculties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "faculty_id" INTEGER NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervisor_recomendation_proposal" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "proposal_id" INTEGER NOT NULL,

    CONSTRAINT "supervisor_recomendation_proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_facultiesTouser_registration" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "faculties_name_key" ON "faculties"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_facultiesTouser_registration_AB_unique" ON "_facultiesTouser_registration"("A", "B");

-- CreateIndex
CREATE INDEX "_facultiesTouser_registration_B_index" ON "_facultiesTouser_registration"("B");

-- CreateIndex
CREATE UNIQUE INDEX "student_proposal_comments_id_key" ON "student_proposal"("comments_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_registration_id_key" ON "users"("user_registration_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_registration_id_fkey" FOREIGN KEY ("user_registration_id") REFERENCES "user_registration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_education_proposal_id_fkey" FOREIGN KEY ("education_proposal_id") REFERENCES "education_proposal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_registration" ADD CONSTRAINT "user_registration_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_student_proposal_id_fkey" FOREIGN KEY ("student_proposal_id") REFERENCES "student_proposal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_supervisor_recomendation_proposal_id_fkey" FOREIGN KEY ("supervisor_recomendation_proposal_id") REFERENCES "supervisor_recomendation_proposal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_proposal" ADD CONSTRAINT "student_proposal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "education_proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_recomendation_proposal" ADD CONSTRAINT "supervisor_recomendation_proposal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "education_proposal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_recomendation_proposal" ADD CONSTRAINT "supervisor_recomendation_proposal_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_facultiesTouser_registration" ADD CONSTRAINT "_facultiesTouser_registration_A_fkey" FOREIGN KEY ("A") REFERENCES "faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_facultiesTouser_registration" ADD CONSTRAINT "_facultiesTouser_registration_B_fkey" FOREIGN KEY ("B") REFERENCES "user_registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
