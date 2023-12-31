import { Produto } from "../../../domain/entities/produto";
import { ProdutoRepository } from "../../../interfaces/repositories/produto.repository.interface";

class RemoverProdutoUseCase {
    constructor(private produtoRepository: ProdutoRepository) { }

    async execute(id: string): Promise<void> {
        const produto = await this.produtoRepository.removerProduto(id);
    }
}

export default RemoverProdutoUseCase;
