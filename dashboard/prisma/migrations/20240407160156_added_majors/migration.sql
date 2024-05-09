/*
  Warnings:

  - You are about to drop the column `faculty_id` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the `user_registration` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `major_id` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "user_registration" DROP CONSTRAINT "user_registration_group_id_fkey";

-- DropForeignKey
ALTER TABLE "user_registration" DROP CONSTRAINT "user_registration_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "faculty_id",
ADD COLUMN     "major_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "user_registration";

-- CreateTable
CREATE TABLE "majors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "faculty_id" INTEGER NOT NULL,

    CONSTRAINT "majors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_groupsTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "majors_name_key" ON "majors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_groupsTousers_AB_unique" ON "_groupsTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_groupsTousers_B_index" ON "_groupsTousers"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "majors" ADD CONSTRAINT "majors_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupsTousers" ADD CONSTRAINT "_groupsTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupsTousers" ADD CONSTRAINT "_groupsTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
