/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "orderId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "transaction_orderId_key" ON "transaction"("orderId");
