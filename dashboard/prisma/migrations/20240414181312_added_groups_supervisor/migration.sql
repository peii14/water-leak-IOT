/*
  Warnings:

  - You are about to drop the `_groupsTousers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_groupsTousers" DROP CONSTRAINT "_groupsTousers_A_fkey";

-- DropForeignKey
ALTER TABLE "_groupsTousers" DROP CONSTRAINT "_groupsTousers_B_fkey";

-- DropTable
DROP TABLE "_groupsTousers";

-- CreateTable
CREATE TABLE "_students" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_supervisors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_students_AB_unique" ON "_students"("A", "B");

-- CreateIndex
CREATE INDEX "_students_B_index" ON "_students"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_supervisors_AB_unique" ON "_supervisors"("A", "B");

-- CreateIndex
CREATE INDEX "_supervisors_B_index" ON "_supervisors"("B");

-- AddForeignKey
ALTER TABLE "_students" ADD CONSTRAINT "_students_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_students" ADD CONSTRAINT "_students_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_supervisors" ADD CONSTRAINT "_supervisors_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_supervisors" ADD CONSTRAINT "_supervisors_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
