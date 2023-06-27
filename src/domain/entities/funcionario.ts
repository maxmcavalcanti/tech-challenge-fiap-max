import { randomUUID } from "crypto";

export class Funcionario {
    public id: string
    public nome: string;
    public cargo: string;
    public login: string;
    public senha: string;

    constructor(nome: string, cargo: string, login: string, senha: string, id?: string) {
        this.id = id ?? randomUUID()
        this.nome = nome;
        this.cargo = cargo;
        this.login = login;
        this.senha = senha;
    }
}