/*
  Warnings:

  - Added the required column `siteId` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_id_fkey";

-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "siteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Material" ADD FOREIGN KEY ("siteId") REFERENCES "ConstructionSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
