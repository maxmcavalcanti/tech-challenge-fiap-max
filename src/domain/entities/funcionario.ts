export class Funcionario {
  public id: string | null
  public nome: string
  public email: string
  public senha: string

  constructor(
    nome: string,
    email: string,
    senha: string,
    id: string
  ) {
    this.id = id
    this.nome = nome
    this.email = email
    this.senha = senha
  }
}
