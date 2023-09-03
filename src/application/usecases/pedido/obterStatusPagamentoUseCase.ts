import { Pedido } from "../../../domain/entities/pedido";
import { PedidoRepository } from "../../../interfaces/repositories/pedido.repository.interface";

class ObterStatusPagamentoUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(id: string): Promise<{ numeroPedido: number, statusPagamento: string } | null> {
        const pedido = await this.pedidoRepository.obterStatusPagamento(id)
        return pedido;
    }
}
export default ObterStatusPagamentoUseCase