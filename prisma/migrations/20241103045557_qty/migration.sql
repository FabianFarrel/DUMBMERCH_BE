/*
  Warnings:

  - You are about to drop the column `quantity` on the `cart_item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,cartId]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cart_userId_key";

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "cart_item" DROP COLUMN "quantity",
ADD COLUMN     "qty" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_productId_cartId_key" ON "cart_item"("productId", "cartId");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
