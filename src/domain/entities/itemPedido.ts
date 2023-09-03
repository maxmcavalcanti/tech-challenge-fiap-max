
export class ItemPedido {
    public produtoId: string;
    public quantidade: number;
    public precoUnitario: number;

    constructor(produtoId: string, quantidade: number, precoUnitario: number) {
        this.produtoId = produtoId;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }
}