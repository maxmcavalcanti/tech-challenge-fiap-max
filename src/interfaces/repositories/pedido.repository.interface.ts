import { ItemPedido } from '../../domain/entities/itemPedido';
import { Pedido } from '../../domain/entities/pedido';
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

export interface PedidoRepository {
    criarPedido(clienteId: string, produtos: ItemPedido[], metodoPagamento: string, totalValue: number): Promise<Pedido>;
    atualizarPedido(id: string, produtos: ItemPedido[]): Promise<Pedido>;
    mudarStatus(id: string, status: string): Promise<Pedido | null>;
    mudarStatusPagamento(id: string, statusPagamento: string): Promise<Pedido | null>;
    removerPedido(id: string): Promise<Pedido | null>;
    obterPedidos(): Promise<PedidoFinal[]>;
    obterPedidoPorId(id: string): Promise<Pedido | null>;
    obterStatusPagamento(id: string): Promise<{ numeroPedido: number, statusPagamento: string } | null>;
}
