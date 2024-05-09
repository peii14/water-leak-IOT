/*
  Warnings:

  - Added the required column `status_id` to the `draft` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_status_id_fkey";

-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_supervisor_recomendations_id_fkey";

-- AlterTable
ALTER TABLE "draft" ADD COLUMN     "status_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "draft" ADD CONSTRAINT "draft_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_supervisor_recomendations_id_fkey" FOREIGN KEY ("supervisor_recomendations_id") REFERENCES "supervisor_recomendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
