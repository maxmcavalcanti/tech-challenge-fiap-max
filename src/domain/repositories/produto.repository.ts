import { PrismaClient } from '@prisma/client';
import { Produto } from '../entities/produto';

class ProdutoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async criarProduto(produtoData: Partial<Produto>): Promise<Produto> {
        return this.prisma.produto.create({ data: produtoData });
    }

    async atualizarProduto(id: string, produtoData: Partial<Produto>): Promise<Produto> {
        return this.prisma.produto.update({ where: { id }, data: produtoData });
    }

    async obterProdutoPorId(id: string): Promise<Produto | null> {
        return this.prisma.produto.findUnique({ where: { id } });
    }

    async obterProdutos(): Promise<Produto[]> {
        return this.prisma.produto.findMany();
    }

    async removerProduto(id: string): Promise<Produto> {
        return this.prisma.produto.delete({ where: { id } });
    }
}
export default ProdutoRepository