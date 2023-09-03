import { Pedido } from "../../../domain/entities/pedido";
import { PedidoRepository } from "../../../interfaces/repositories/pedido.repository.interface";

class BuscarPedidoPorIdUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(id: string): Promise<Pedido | null> {
        const pedido = await this.pedidoRepository.obterPedidoPorId(id)
        return pedido;
    }
}
export default BuscarPedidoPorIdUseCase