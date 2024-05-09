/*
  Warnings:

  - You are about to drop the `_supervisor_faculty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_supervisor_faculty" DROP CONSTRAINT "_supervisor_faculty_A_fkey";

-- DropForeignKey
ALTER TABLE "_supervisor_faculty" DROP CONSTRAINT "_supervisor_faculty_B_fkey";

-- DropTable
DROP TABLE "_supervisor_faculty";

-- CreateTable
CREATE TABLE "_multiple_faculty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_multiple_faculty_AB_unique" ON "_multiple_faculty"("A", "B");

-- CreateIndex
CREATE INDEX "_multiple_faculty_B_index" ON "_multiple_faculty"("B");

-- AddForeignKey
ALTER TABLE "_multiple_faculty" ADD CONSTRAINT "_multiple_faculty_A_fkey" FOREIGN KEY ("A") REFERENCES "faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_multiple_faculty" ADD CONSTRAINT "_multiple_faculty_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
