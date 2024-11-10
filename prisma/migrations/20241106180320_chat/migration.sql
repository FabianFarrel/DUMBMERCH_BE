-- AlterTable
ALTER TABLE "message" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "message_id_seq";

-- AlterTable
ALTER TABLE "room" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "room_id_seq";
