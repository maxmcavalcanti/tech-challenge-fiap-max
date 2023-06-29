import { randomUUID } from 'crypto'

export class Funcionario {
  public id: string
  public nome: string
  public cargo: string
  public email: string
  public senha: string

  constructor(
    nome: string,
    cargo: string,
    email: string,
    senha: string,
    id?: string,
  ) {
    this.id = id ?? randomUUID()
    this.nome = nome
    this.cargo = cargo
    this.email = email
    this.senha = senha
  }
}
