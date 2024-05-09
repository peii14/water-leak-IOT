/*
  Warnings:

  - You are about to drop the column `isRegistered` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deans_faculty_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isRegistered",
ADD COLUMN     "deans_faculty_id" INTEGER;

-- CreateTable
CREATE TABLE "_supervisor_faculty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_supervisor_faculty_AB_unique" ON "_supervisor_faculty"("A", "B");

-- CreateIndex
CREATE INDEX "_supervisor_faculty_B_index" ON "_supervisor_faculty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "users_deans_faculty_id_key" ON "users"("deans_faculty_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_deans_faculty_id_fkey" FOREIGN KEY ("deans_faculty_id") REFERENCES "faculties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_supervisor_faculty" ADD CONSTRAINT "_supervisor_faculty_A_fkey" FOREIGN KEY ("A") REFERENCES "faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_supervisor_faculty" ADD CONSTRAINT "_supervisor_faculty_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
