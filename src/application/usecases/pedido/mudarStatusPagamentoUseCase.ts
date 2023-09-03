import { Pedido } from "../../../domain/entities/pedido";
import { PedidoRepository } from "../../../interfaces/repositories/pedido.repository.interface";

class MudarStatusPagamentoUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(id: string, status: string): Promise<Pedido | null> {
        const pedidoAlterado = await this.pedidoRepository.mudarStatusPagamento(id, status)
        return pedidoAlterado;
    }
}
export default MudarStatusPagamentoUseCase