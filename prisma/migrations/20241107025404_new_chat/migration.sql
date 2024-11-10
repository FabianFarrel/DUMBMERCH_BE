-- AlterTable
CREATE SEQUENCE room_id_seq;
ALTER TABLE "room" ALTER COLUMN "id" SET DEFAULT nextval('room_id_seq');
ALTER SEQUENCE room_id_seq OWNED BY "room"."id";
