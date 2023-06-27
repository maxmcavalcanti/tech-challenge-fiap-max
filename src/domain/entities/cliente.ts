import { randomUUID } from "crypto"

export class Cliente {
    public id: string
    public nome: string
    public email: string
    public cpf: string

    constructor(nome: string, email: string, cpf: string, id?: string) {
        this.id = id ?? randomUUID()
        this.nome = nome
        this.email = email
        this.cpf = cpf
    }
}