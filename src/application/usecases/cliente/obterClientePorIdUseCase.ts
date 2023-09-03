import { Cliente } from "../../../domain/entities/cliente";
import { ClienteRepository } from "../../../interfaces/repositories/cliente.repository.interface";


export class ObterClientePorIdUseCase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(id: string): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.obterClientePorId(id);
    return cliente;
  }
}