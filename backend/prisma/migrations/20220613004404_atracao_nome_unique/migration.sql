/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `atracoes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "atracoes_nome_key" ON "atracoes"("nome");
