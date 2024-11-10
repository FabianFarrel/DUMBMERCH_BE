/*
  Warnings:

  - You are about to drop the column `orderId` on the `transaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "transaction_orderId_key";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "orderId";
