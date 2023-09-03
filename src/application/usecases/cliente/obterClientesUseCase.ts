import { Cliente } from "../../../domain/entities/cliente";
import { ClienteRepository } from "../../../interfaces/repositories/cliente.repository.interface";


export class ObterClientesUseCase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(): Promise<Cliente[]> {
    const cliente = await this.clienteRepository.obterClientes();
    return cliente;
  }
}