import { Pedido } from "../../entities/pedido";
import PedidoRepository from "../../repositories/pedido.repository";


class CriarPedidoUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(pedidoData: Partial<Pedido>): Promise<Pedido> {
        const pedido = await this.pedidoRepository.criarPedido(pedidoData);
        return pedido;
    }
}

export default CriarPedidoUseCase;
