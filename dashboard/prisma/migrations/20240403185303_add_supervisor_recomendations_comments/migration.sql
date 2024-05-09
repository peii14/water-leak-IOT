/*
  Warnings:

  - A unique constraint covering the columns `[supervisor_recommendations_id]` on the table `comments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "supervisor_recommendations_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "comments_supervisor_recommendations_id_key" ON "comments"("supervisor_recommendations_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_supervisor_recommendations_id_fkey" FOREIGN KEY ("supervisor_recommendations_id") REFERENCES "supervisor_recomendations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
