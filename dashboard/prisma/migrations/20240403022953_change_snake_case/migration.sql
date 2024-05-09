/*
  Warnings:

  - You are about to drop the `userGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userGroup" DROP CONSTRAINT "userGroup_education_id_fkey";

-- DropForeignKey
ALTER TABLE "userGroup" DROP CONSTRAINT "userGroup_group_id_fkey";

-- DropTable
DROP TABLE "userGroup";

-- CreateTable
CREATE TABLE "user_group" (
    "education_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "user_group_pkey" PRIMARY KEY ("education_id","group_id")
);

-- AddForeignKey
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "education_entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group" ADD CONSTRAINT "user_group_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
