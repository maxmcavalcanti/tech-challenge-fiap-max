import { Produto } from "../../../domain/entities/produto";
import { ProdutoRepository } from "../../../interfaces/repositories/produto.repository.interface";


class EditarProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) { }

  async execute(id: string, produtoData: Partial<Produto>): Promise<Produto | null> {
    const produto = await this.produtoRepository.atualizarProduto(id, produtoData);
    return produto;
  }
}

export default EditarProdutoUseCase;
