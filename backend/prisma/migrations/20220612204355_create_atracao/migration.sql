-- CreateTable
CREATE TABLE "fila" (
    "id_atracao" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "posicao" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "atracoes" (
    "id" SERIAL NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "duracao" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "atracoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fila_id_usuario_key" ON "fila"("id_usuario");

-- AddForeignKey
ALTER TABLE "fila" ADD CONSTRAINT "fila_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fila" ADD CONSTRAINT "fila_id_atracao_fkey" FOREIGN KEY ("id_atracao") REFERENCES "atracoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
