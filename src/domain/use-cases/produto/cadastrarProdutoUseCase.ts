
import { Produto } from '../../entities/produto';
import ProdutoRepository from '../../repositories/produto.repository';

class CriarProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) { }

  async execute(produtoData: Partial<Produto>): Promise<Produto> {
    const produto = await this.produtoRepository.criarProduto(produtoData);
    return produto;
  }
}

export default CriarProdutoUseCase;
