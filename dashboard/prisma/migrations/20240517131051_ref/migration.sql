/*
  Warnings:

  - You are about to drop the column `father_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_draftTokeywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_multiple_faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_multiple_keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_multiple_major` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_recommendations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_supervisors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `draft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `faculties` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `majors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proposals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supervisor_recomendations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_draftTokeywords" DROP CONSTRAINT "_draftTokeywords_A_fkey";

-- DropForeignKey
ALTER TABLE "_draftTokeywords" DROP CONSTRAINT "_draftTokeywords_B_fkey";

-- DropForeignKey
ALTER TABLE "_multiple_faculty" DROP CONSTRAINT "_multiple_faculty_A_fkey";

-- DropForeignKey
ALTER TABLE "_multiple_faculty" DROP CONSTRAINT "_multiple_faculty_B_fkey";

-- DropForeignKey
ALTER TABLE "_multiple_keywords" DROP CONSTRAINT "_multiple_keywords_A_fkey";

-- DropForeignKey
ALTER TABLE "_multiple_keywords" DROP CONSTRAINT "_multiple_keywords_B_fkey";

-- DropForeignKey
ALTER TABLE "_multiple_major" DROP CONSTRAINT "_multiple_major_A_fkey";

-- DropForeignKey
ALTER TABLE "_multiple_major" DROP CONSTRAINT "_multiple_major_B_fkey";

-- DropForeignKey
ALTER TABLE "_recommendations" DROP CONSTRAINT "_recommendations_A_fkey";

-- DropForeignKey
ALTER TABLE "_recommendations" DROP CONSTRAINT "_recommendations_B_fkey";

-- DropForeignKey
ALTER TABLE "_students" DROP CONSTRAINT "_students_A_fkey";

-- DropForeignKey
ALTER TABLE "_students" DROP CONSTRAINT "_students_B_fkey";

-- DropForeignKey
ALTER TABLE "_supervisors" DROP CONSTRAINT "_supervisors_A_fkey";

-- DropForeignKey
ALTER TABLE "_supervisors" DROP CONSTRAINT "_supervisors_B_fkey";

-- DropForeignKey
ALTER TABLE "draft" DROP CONSTRAINT "draft_status_id_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_major_id_fkey";

-- DropForeignKey
ALTER TABLE "keywords" DROP CONSTRAINT "keywords_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "majors" DROP CONSTRAINT "majors_faculty_id_fkey";

-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_draft_id_fkey";

-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_group_id_fkey";

-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_student_id_fkey";

-- DropForeignKey
ALTER TABLE "proposals" DROP CONSTRAINT "proposals_supervisor_id_fkey";

-- DropForeignKey
ALTER TABLE "supervisor_recomendations" DROP CONSTRAINT "supervisor_recomendations_draft_id_fkey";

-- DropForeignKey
ALTER TABLE "supervisor_recomendations" DROP CONSTRAINT "supervisor_recomendations_selected_student_id_fkey";

-- DropForeignKey
ALTER TABLE "supervisor_recomendations" DROP CONSTRAINT "supervisor_recomendations_supervisor_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "father_name";

-- DropTable
DROP TABLE "_draftTokeywords";

-- DropTable
DROP TABLE "_multiple_faculty";

-- DropTable
DROP TABLE "_multiple_keywords";

-- DropTable
DROP TABLE "_multiple_major";

-- DropTable
DROP TABLE "_recommendations";

-- DropTable
DROP TABLE "_students";

-- DropTable
DROP TABLE "_supervisors";

-- DropTable
DROP TABLE "draft";

-- DropTable
DROP TABLE "faculties";

-- DropTable
DROP TABLE "groups";

-- DropTable
DROP TABLE "keywords";

-- DropTable
DROP TABLE "majors";

-- DropTable
DROP TABLE "proposals";

-- DropTable
DROP TABLE "status";

-- DropTable
DROP TABLE "supervisor_recomendations";

-- CreateTable
CREATE TABLE "limits" (
    "id" SERIAL NOT NULL,
    "limit" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "limits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "limits_user_id_key" ON "limits"("user_id");

-- AddForeignKey
ALTER TABLE "limits" ADD CONSTRAINT "limits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
