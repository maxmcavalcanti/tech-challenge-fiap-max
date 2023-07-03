
import { Produto } from '../../../domain/entities/produto';
import ProdutoRepository from '../../../interfaces/repositories/produto.repository';

class CriarProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) { }

  async execute(produtoData: Produto): Promise<Produto> {
    const produto = await this.produtoRepository.criarProduto(produtoData);
    return produto;
  }
}

export default CriarProdutoUseCase;
