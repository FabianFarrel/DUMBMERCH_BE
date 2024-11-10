-- AlterTable
CREATE SEQUENCE message_id_seq;
ALTER TABLE "message" ALTER COLUMN "id" SET DEFAULT nextval('message_id_seq');
ALTER SEQUENCE message_id_seq OWNED BY "message"."id";
