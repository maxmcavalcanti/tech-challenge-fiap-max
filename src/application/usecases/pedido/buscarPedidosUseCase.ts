import { PedidoRepository } from "../../../interfaces/repositories/pedido.repository.interface";

export interface PedidoFinal {
    produtos: {
        quantidade: number;
        nome: string;
    }[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    totalValue: number;
    clienteId: string;
    metodoPagamento: string;
    status: string;
    statusPagamento: string;
    numeroPedido: number;
}

class BuscarPedidosUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(): Promise<PedidoFinal[]> {
        const pedidos = await this.pedidoRepository.obterPedidos()
        return pedidos;
    }
}
export default BuscarPedidosUseCase