import { ItemPedido } from "@prisma/client";
import { randomUUID } from "crypto";

export class Pedido {
    public id: string
    public clienteId: string;
    public produtos: ItemPedido[];
    public status: string;
    public metodoPagamento: string;

    constructor(clienteId: string, produtos: ItemPedido[], status: string, metodoPagamento: string, id?: string) {
        this.id = id ?? randomUUID()
        this.clienteId = clienteId;
        this.produtos = produtos;
        this.status = status;
        this.metodoPagamento = metodoPagamento;
    }
}