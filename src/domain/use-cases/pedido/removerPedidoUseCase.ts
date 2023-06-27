import { Pedido } from "../../entities/pedido";
import PedidoRepository from "../../repositories/pedido.repository";

class RemoverPedidoUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(id: string): Promise<Pedido | null> {
        const pedido = await this.pedidoRepository.removerPedido(id);
        return pedido;
    }
}

export default RemoverPedidoUseCase;
