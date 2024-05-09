-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_faculty_id_fkey";

-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
