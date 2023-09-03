import { randomUUID } from "crypto";

export class Produto {
    public id: string | null
    public nome: string;
    public descricao: string;
    public preco: number;
    public categoria: string;

    constructor(nome: string, descricao: string, preco: number, categoria: string, id: string) {
        this.id = id
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
    }
}