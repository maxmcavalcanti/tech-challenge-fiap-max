import { Cliente } from "../../../domain/entities/cliente";
import { ClienteRepository } from "../../../interfaces/repositories/cliente.repository.interface";


export class ObterClientePorCPFUseCase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(CPF: string): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.obterClientePorCPF(CPF);
    return cliente;
  }
}