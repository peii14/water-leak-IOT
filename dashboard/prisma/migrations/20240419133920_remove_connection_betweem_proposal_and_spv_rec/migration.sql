/*
  Warnings:

  - You are about to drop the column `supervisor_recomendations_id` on the `proposals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_supervisor_recomendations_id_fkey";

-- DropIndex
DROP INDEX "proposals_supervisor_recomendations_id_key";

-- AlterTable
ALTER TABLE "proposals" DROP COLUMN "supervisor_recomendations_id";
