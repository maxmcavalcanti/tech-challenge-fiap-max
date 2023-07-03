import { Produto } from "./produto";

export class ItemPedido {
    public productId: string;
    public quantidade: number;
    public precoUnitario: number;

    constructor(productId: string, quantidade: number, precoUnitario: number) {
        this.productId = productId;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }
}