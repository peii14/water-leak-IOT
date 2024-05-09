/*
  Warnings:

  - Added the required column `faculty_id` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group" ADD COLUMN     "faculty_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isRegistered" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
