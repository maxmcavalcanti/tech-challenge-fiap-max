import { Produto } from "../../../domain/entities/produto";
import { ProdutoRepository } from "../../../interfaces/repositories/produto.repository.interface";

class CriarProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) { }

  async execute(produtoData: Produto): Promise<Produto> {
    console.log('produtoData-CriarProdutouseCase', produtoData)
    const produto = await this.produtoRepository.criarProduto(produtoData);
    console.log('produto-repository', produto)
    return produto;
  }
}

export default CriarProdutoUseCase;
