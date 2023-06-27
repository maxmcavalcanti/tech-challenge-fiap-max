import { Pedido } from "../../entities/pedido";
import PedidoRepository from "../../repositories/pedido.repository";

class AtualizarPedidoUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(id: string, pedidoData: Partial<Pedido>): Promise<Pedido | null> {
        const pedido = await this.pedidoRepository.atualizarPedido(id, pedidoData);
        return pedido;
    }
}

export default AtualizarPedidoUseCase;
