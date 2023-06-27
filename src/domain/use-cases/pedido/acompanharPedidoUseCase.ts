import { randomUUID } from "crypto";
import { ItemPedido } from "../../entities/itemPedido";


interface PedidoRecebidoProps {
    clienteId: string
    itens: ItemPedido[]
    metodoPagamento: string
    status: string
    pedidoId: string
}
export class AcompanharPedidoUseCase {
    execute(pedidoId: string): string {
        //TODO
        //LÓGICA PARA BUSCAR PEDIDO

        // Lógica para acompanhar o pedido
        // const pedido = RepositorioPedidos.obterPedidoPorId(pedidoId);
        // return pedido.status;
        return pedidoId
    }
}