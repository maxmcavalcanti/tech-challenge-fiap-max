import { Produto } from "../../../domain/entities/produto";
import { ProdutoRepository } from "../../../interfaces/repositories/produto.repository.interface";

class BuscarProdutoPorCategoriaUseCase {
    constructor(private produtoRepository: ProdutoRepository) { }

    async execute(categoria: string): Promise<Produto[] | null> {

        const produtos = await this.produtoRepository.obterProdutoPorCategoria(categoria);
        return produtos
    }
}

export default BuscarProdutoPorCategoriaUseCase;
