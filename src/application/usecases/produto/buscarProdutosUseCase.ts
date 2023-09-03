import { Produto } from "../../../domain/entities/produto";
import { ProdutoRepository } from "../../../interfaces/repositories/produto.repository.interface";

class BuscarProdutosUseCase {
    constructor(private produtoRepository: ProdutoRepository) { }

    async execute(): Promise<Produto[] | null> {
        const produtos = await this.produtoRepository.obterProdutos();
        return produtos
    }
}

export default BuscarProdutosUseCase;
