-- AlterSequence
ALTER SEQUENCE "Contact_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "email" DROP NOT NULL;
ALTER TABLE "Contact" ALTER COLUMN "phoneNumber" DROP NOT NULL;
