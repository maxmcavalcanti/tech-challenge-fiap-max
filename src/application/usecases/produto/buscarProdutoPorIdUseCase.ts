import { Produto } from "../../../domain/entities/produto";
import { ProdutoRepository } from "../../../interfaces/repositories/produto.repository.interface";

class BuscarProdutoPorIdUseCase {
    constructor(private produtoRepository: ProdutoRepository) { }

    async execute(id: string): Promise<Produto | null> {
        const produto = await this.produtoRepository.obterProdutoPorId(id);
        return produto
    }
}

export default BuscarProdutoPorIdUseCase;
