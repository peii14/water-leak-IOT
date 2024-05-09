/*
  Warnings:

  - You are about to drop the column `deans_faculty_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_deans_faculty_id_fkey";

-- DropIndex
DROP INDEX "users_deans_faculty_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "deans_faculty_id";

-- CreateTable
CREATE TABLE "_multiple_major" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_multiple_major_AB_unique" ON "_multiple_major"("A", "B");

-- CreateIndex
CREATE INDEX "_multiple_major_B_index" ON "_multiple_major"("B");

-- AddForeignKey
ALTER TABLE "_multiple_major" ADD CONSTRAINT "_multiple_major_A_fkey" FOREIGN KEY ("A") REFERENCES "majors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_multiple_major" ADD CONSTRAINT "_multiple_major_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
