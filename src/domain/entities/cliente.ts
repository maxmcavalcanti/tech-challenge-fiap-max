export class Cliente {
    public id: string | null
    public nome: string
    public email: string
    public cpf: string
    public endereco: string

    constructor(nome: string, email: string, cpf: string, endereco: string, id: string) {
        this.id = id
        this.nome = nome
        this.email = email
        this.cpf = cpf
        this.endereco = endereco
    }
}