import { ItemPedido } from "../../../domain/entities/itemPedido";
import { Pedido } from "../../../domain/entities/pedido";
import { PedidoRepository } from "../../../interfaces/repositories/pedido.repository.interface";
import { Pedido as PedidoPrisma } from '@prisma/client';

class AtualizarPedidoUseCase {
    constructor(private pedidoRepository: PedidoRepository) { }

    async execute(id: string, produtos: ItemPedido[]): Promise<any> {
        const pedido = await this.pedidoRepository.atualizarPedido(id, produtos);
        return pedido;
    }
}

export default AtualizarPedidoUseCase;
