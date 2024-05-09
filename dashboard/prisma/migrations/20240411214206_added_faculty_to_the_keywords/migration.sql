/*
  Warnings:

  - Added the required column `faculty_id` to the `keywords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "keywords" ADD COLUMN     "faculty_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "keywords" ADD CONSTRAINT "keywords_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
