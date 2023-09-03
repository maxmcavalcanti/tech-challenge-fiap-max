import { ItemPedido } from "../../../domain/entities/itemPedido";
import { Pedido } from "../../../domain/entities/pedido";
import { Produto } from "../../../domain/entities/produto";
import { ClienteRepository } from "../../../interfaces/repositories/cliente.repository.interface";
import { PedidoRepository } from "../../../interfaces/repositories/pedido.repository.interface";
import { ProdutoRepository } from "../../../interfaces/repositories/produto.repository.interface";

class CriarPedidoUseCase {
    constructor(private pedidoRepository: PedidoRepository, private clienteRepository: ClienteRepository, private produtoRepository: ProdutoRepository) { }

    async execute(cpf: string, produtos: Produto[], metodoPagamento: string): Promise<Pedido> {
        const cliente = await this.clienteRepository.obterClientePorCPF(cpf);
        if (!cliente) { throw new Error('Cliente inválido. Não foi possível criar o pedido!'); }
        const totalValue = produtos.reduce((accumulator: any, produto: any) => accumulator + produto.quantidade * produto.precoUnitario, 0);
        const pedido = new Pedido(cliente.id as string, produtos.map((produto: any) => new ItemPedido(produto.produtoId, produto.quantidade, produto.precoUnitario)), 'Recebido', metodoPagamento);
        const produtosPedido = pedido.produtos.map((item: any) => ({ produtoId: item.produtoId, quantidade: item.quantidade, precoUnitario: item.precoUnitario, }))
        const pedidoSalvo = await this.pedidoRepository.criarPedido(cliente.id as string, produtosPedido, metodoPagamento, totalValue);
        const produtosComNomes = await Promise.all(
            pedidoSalvo.produtos.map(async (item: any) => {
                const nomeProduto = await this.produtoRepository.obterProdutoPorId(item.produtoId);
                return { ...item, nome: nomeProduto?.nome || '', };
            })
        );
        return { ...pedidoSalvo, produtos: produtosComNomes, };
    }
}
export default CriarPedidoUseCase;
