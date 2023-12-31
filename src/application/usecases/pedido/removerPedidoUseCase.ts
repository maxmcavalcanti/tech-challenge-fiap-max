import { Pedido } from "../../../domain/entities/pedido";
import { PedidoRepository } from "../../../interfaces/repositories/pedido.repository.interface";


class RemoverPedidoUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(id: string): Promise<Pedido | null> {
        const pedido = await this.pedidoRepository.removerPedido(id);
        return pedido;
    }
}

export default RemoverPedidoUseCase;
