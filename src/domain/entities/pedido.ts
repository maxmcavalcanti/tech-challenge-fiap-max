import { ItemPedido } from "./itemPedido";

export class Pedido {
    public clienteId: string;
    public produtos: ItemPedido[];
    public status: string;
    public metodoPagamento: string;

    constructor(clienteId: string, produtos: ItemPedido[], status: string, metodoPagamento: string) {
        this.clienteId = clienteId;
        this.produtos = produtos;
        this.status = status;
        this.metodoPagamento = metodoPagamento;
    }
}