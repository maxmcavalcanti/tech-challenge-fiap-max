import ProdutoRepository from '../../repositories/produto.repository';
import { Produto } from '../../entities/produto';

class EditarProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) { }

  async execute(id: string, produtoData: Partial<Produto>): Promise<Produto | null> {
    const produto = await this.produtoRepository.atualizarProduto(id, produtoData);
    return produto;
  }
}

export default EditarProdutoUseCase;
