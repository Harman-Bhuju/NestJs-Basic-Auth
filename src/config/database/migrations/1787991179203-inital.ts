import { MigrationInterface, QueryRunner } from "typeorm";

export class Inital1787991179203 implements MigrationInterface {
    name = 'Inital1787991179203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "hashToken" character varying NOT NULL, "expiryAt" TIMESTAMP NOT NULL, "revoked" boolean NOT NULL DEFAULT false, "userId" character varying, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cfc7242b5b8e91e990931356c3" ON "refresh_token"  ("hashToken") `);
        await queryRunner.query(`CREATE TYPE "public"."file_type_enum" AS ENUM('profile')`);
        await queryRunner.query(`CREATE TYPE "public"."file_metatype_enum" AS ENUM('image', 'pdf')`);
        await queryRunner.query(`CREATE TABLE "file" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fileUrl" character varying NOT NULL, "publicId" character varying NOT NULL, "type" "public"."file_type_enum" NOT NULL, "metaType" "public"."file_metatype_enum" NOT NULL, "userId" character varying, CONSTRAINT "REL_b2d8e683f020f61115edea206b" UNIQUE ("userId"), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_65593ce703593144d5a8f5fddf" ON "file"  ("type") `);
        await queryRunner.query(`CREATE TABLE "authorization" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "path" character varying NOT NULL, "methods" text NOT NULL, "roleId" character varying, CONSTRAINT "PK_a8a47afd6ac0d056caccc1e9d22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_39bc6fc1dbb66cfb2045d9f2bb" ON "authorization"  ("roleId", "path") `);
        await queryRunner.query(`CREATE TYPE "public"."role_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."role_role_enum" NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_367aad98203bd8afaed0d70409" ON "role"  ("role") `);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female', 'other', 'prefer_not_to_say')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "middleName" character varying, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roleId" character varying NOT NULL, "contactNumber" character varying, "address" character varying, "province" character varying, "district" character varying, "gender" "public"."user_gender_enum", "otpCode" character varying(6), "otpExpiryTime" TIMESTAMP, "otpAttempts" integer NOT NULL DEFAULT '0', "otpLockedUntil" TIMESTAMP, "isEmailVerified" boolean NOT NULL DEFAULT false, "isPasswordResetVerified" boolean NOT NULL DEFAULT false, "tokenVersion" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user"  ("email") `);
        await queryRunner.query(`CREATE INDEX "idx_user_role" ON "user"  ("roleId") `);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_b2d8e683f020f61115edea206b3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "authorization" ADD CONSTRAINT "FK_da7914c44f44c939f586d743e83" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "authorization" DROP CONSTRAINT "FK_da7914c44f44c939f586d743e83"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_b2d8e683f020f61115edea206b3"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_367aad98203bd8afaed0d70409"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39bc6fc1dbb66cfb2045d9f2bb"`);
        await queryRunner.query(`DROP TABLE "authorization"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65593ce703593144d5a8f5fddf"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TYPE "public"."file_metatype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."file_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cfc7242b5b8e91e990931356c3"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
