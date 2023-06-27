import ProdutoRepository from '../../repositories/produto.repository';
import { Produto } from '../../entities/produto';

class RemoverProdutoUseCase {
    constructor(private produtoRepository: ProdutoRepository) { }

    async execute(id: string): Promise<Produto | null> {
        const produto = await this.produtoRepository.removerProduto(id);
        return produto;
    }
}

export default RemoverProdutoUseCase;
