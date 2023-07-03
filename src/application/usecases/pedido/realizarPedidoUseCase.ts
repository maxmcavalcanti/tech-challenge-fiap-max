import { Pedido } from "@prisma/client";
import PedidoRepository from "../../../interfaces/repositories/pedido.repository";


class CriarPedidoUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(pedidoData: Pedido): Promise<Pedido> {
        const pedido = await this.pedidoRepository.criarPedido(pedidoData);
        return pedido;
    }
}

export default CriarPedidoUseCase;
