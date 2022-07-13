/*
  Warnings:

  - A unique constraint covering the columns `[contentfulId]` on the table `Posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentfulId` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Posts` ADD COLUMN `contentfulId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Posts_contentfulId_key` ON `Posts`(`contentfulId`);
