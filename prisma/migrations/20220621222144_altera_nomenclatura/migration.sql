/*
  Warnings:

  - You are about to drop the `atracoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fila` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fila" DROP CONSTRAINT "fila_id_atracao_fkey";

-- DropForeignKey
ALTER TABLE "fila" DROP CONSTRAINT "fila_id_usuario_fkey";

-- DropTable
DROP TABLE "atracoes";

-- DropTable
DROP TABLE "fila";

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queue" (
    "id_attraction" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "position" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "attractions" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "duration" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "attractions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "queue_id_user_key" ON "queue"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "attractions_code_key" ON "attractions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "attractions_name_key" ON "attractions"("name");

-- AddForeignKey
ALTER TABLE "queue" ADD CONSTRAINT "queue_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue" ADD CONSTRAINT "queue_id_attraction_fkey" FOREIGN KEY ("id_attraction") REFERENCES "attractions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
