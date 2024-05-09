/*
  Warnings:

  - You are about to drop the column `student_proposal_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `supervisor_recomendation_proposal_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `education_proposal_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_registration_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_facultiesTouser_registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `education_proposal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proposal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_proposal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supervisor_recomendation_proposal` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[supervisor_recomendationsId]` on the table `draft` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `proposal_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_facultiesTouser_registration" DROP CONSTRAINT "_facultiesTouser_registration_A_fkey";

-- DropForeignKey
ALTER TABLE "_facultiesTouser_registration" DROP CONSTRAINT "_facultiesTouser_registration_B_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_student_proposal_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_supervisor_recomendation_proposal_id_fkey";

-- DropForeignKey
ALTER TABLE "proposal" DROP CONSTRAINT "proposal_group_id_fkey";

-- DropForeignKey
ALTER TABLE "proposal" DROP CONSTRAINT "proposal_proposal_id_fkey";

-- DropForeignKey
ALTER TABLE "proposal" DROP CONSTRAINT "proposal_status_id_fkey";

-- DropForeignKey
ALTER TABLE "student_proposal" DROP CONSTRAINT "student_proposal_proposal_id_fkey";

-- DropForeignKey
ALTER TABLE "student_proposal" DROP CONSTRAINT "student_proposal_user_id_fkey";

-- DropForeignKey
ALTER TABLE "supervisor_recomendation_proposal" DROP CONSTRAINT "supervisor_recomendation_proposal_proposal_id_fkey";

-- DropForeignKey
ALTER TABLE "supervisor_recomendation_proposal" DROP CONSTRAINT "supervisor_recomendation_proposal_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_education_proposal_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_registration_id_fkey";

-- DropIndex
DROP INDEX "users_user_registration_id_key";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "student_proposal_id",
DROP COLUMN "supervisor_recomendation_proposal_id",
ADD COLUMN     "proposal_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "draft" ADD COLUMN     "supervisor_recomendationsId" INTEGER;

-- AlterTable
ALTER TABLE "role" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "education_proposal_id",
DROP COLUMN "user_registration_id";

-- DropTable
DROP TABLE "_facultiesTouser_registration";

-- DropTable
DROP TABLE "education_proposal";

-- DropTable
DROP TABLE "proposal";

-- DropTable
DROP TABLE "student_proposal";

-- DropTable
DROP TABLE "supervisor_recomendation_proposal";

-- CreateTable
CREATE TABLE "proposals" (
    "id" SERIAL NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "group_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "supervisor_id" INTEGER NOT NULL,
    "draft_id" INTEGER NOT NULL,
    "supervisor_recomendations_id" INTEGER,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervisor_recomendations" (
    "id" SERIAL NOT NULL,
    "supervisor_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "draft_id" INTEGER,

    CONSTRAINT "supervisor_recomendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_recommendations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "proposals_draft_id_key" ON "proposals"("draft_id");

-- CreateIndex
CREATE UNIQUE INDEX "proposals_supervisor_recomendations_id_key" ON "proposals"("supervisor_recomendations_id");

-- CreateIndex
CREATE UNIQUE INDEX "supervisor_recomendations_draft_id_key" ON "supervisor_recomendations"("draft_id");

-- CreateIndex
CREATE UNIQUE INDEX "_recommendations_AB_unique" ON "_recommendations"("A", "B");

-- CreateIndex
CREATE INDEX "_recommendations_B_index" ON "_recommendations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "draft_supervisor_recomendationsId_key" ON "draft"("supervisor_recomendationsId");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_draft_id_fkey" FOREIGN KEY ("draft_id") REFERENCES "draft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_supervisor_recomendations_id_fkey" FOREIGN KEY ("supervisor_recomendations_id") REFERENCES "supervisor_recomendations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_recomendations" ADD CONSTRAINT "supervisor_recomendations_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_recomendations" ADD CONSTRAINT "supervisor_recomendations_draft_id_fkey" FOREIGN KEY ("draft_id") REFERENCES "draft"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_registration" ADD CONSTRAINT "user_registration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recommendations" ADD CONSTRAINT "_recommendations_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recommendations" ADD CONSTRAINT "_recommendations_B_fkey" FOREIGN KEY ("B") REFERENCES "supervisor_recomendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
