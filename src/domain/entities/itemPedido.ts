import { Produto } from "./produto";

export class ItemPedido {
    public produto: Produto;
    public quantidade: number;
    public precoUnitario: number;

    constructor(produto: Produto, quantidade: number, precoUnitario: number) {
        this.produto = produto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }
}