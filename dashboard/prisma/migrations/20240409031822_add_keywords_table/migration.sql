/*
  Warnings:

  - You are about to drop the column `keywords` on the `draft` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `proposals` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `proposals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_owner_id_fkey";

-- AlterTable
ALTER TABLE "draft" DROP COLUMN "keywords";

-- AlterTable
ALTER TABLE "proposals" DROP COLUMN "owner_id",
ADD COLUMN     "student_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "keywords" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_draftTokeywords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "keywords_name_key" ON "keywords"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_draftTokeywords_AB_unique" ON "_draftTokeywords"("A", "B");

-- CreateIndex
CREATE INDEX "_draftTokeywords_B_index" ON "_draftTokeywords"("B");

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_draftTokeywords" ADD CONSTRAINT "_draftTokeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "draft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_draftTokeywords" ADD CONSTRAINT "_draftTokeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;
