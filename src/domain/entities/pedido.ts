import { randomUUID } from "crypto";
import { Cliente } from "./cliente";
import { ItemPedido } from "./itemPedido";

export class Pedido {
    public id: string
    public cliente: Cliente;
    public itens: ItemPedido[];
    public status: string;
    public metodoPagamento: string;

    constructor(cliente: Cliente, itens: ItemPedido[], status: string, metodoPagamento: string, id?: string) {
        this.id = id ?? randomUUID()
        this.cliente = cliente;
        this.itens = itens;
        this.status = status;
        this.metodoPagamento = metodoPagamento;
    }
}