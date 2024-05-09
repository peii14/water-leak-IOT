-- AlterTable
ALTER TABLE "supervisor_recomendations" ADD COLUMN     "selected_student_id" INTEGER;

-- AddForeignKey
ALTER TABLE "supervisor_recomendations" ADD CONSTRAINT "supervisor_recomendations_selected_student_id_fkey" FOREIGN KEY ("selected_student_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
