import { PrismaClient, Produto } from '@prisma/client';
import { ProdutoRepository } from '../../interfaces/repositories/produto.repository.interface';


export class ProdutoRepositoryImpl implements ProdutoRepository {
    private prisma: PrismaClient;
    constructor() { this.prisma = new PrismaClient(); }

    async criarProduto(produtoData: Produto): Promise<Produto> {
        return await this.prisma.produto.create({ data: produtoData });
    }

    async atualizarProduto(id: string, produtoData: Partial<Produto>): Promise<Produto> {
        return await this.prisma.produto.update({ where: { id }, data: produtoData });
    }

    async obterProdutoPorId(id: string): Promise<Produto | null> {
        return await this.prisma.produto.findUnique({ where: { id } });
    }

    async obterProdutos(): Promise<Produto[]> {
        return await this.prisma.produto.findMany();
    }

    async removerProduto(id: string): Promise<void> {
        await this.prisma.produto.delete({ where: { id } });
    }

    async obterProdutoPorCategoria(category: string): Promise<Produto[] | null> {
        return await this.prisma.produto.findMany({ where: { categoria: { equals: category } } });
    }
}
export default ProdutoRepository