import { Produto } from '../../domain/entities/produto'

export interface ProdutoRepository {
    criarProduto(Produto: Produto): Promise<Produto>;
    atualizarProduto(id: string, ProdutoData: Partial<Produto>): Promise<Produto>;
    obterProdutoPorId(id: string): Promise<Produto | null>;
    obterProdutoPorCategoria(category: string): Promise<Produto[] | null>;
    obterProdutos(): Promise<Produto[]>;
    removerProduto(id: string): Promise<void>;
}