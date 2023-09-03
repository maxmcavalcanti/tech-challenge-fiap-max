import { Cliente } from "../../../domain/entities/cliente";
import { ClienteRepository } from "../../../interfaces/repositories/cliente.repository.interface";


export class RemoverClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(id: string): Promise<void> {
    const cliente = await this.clienteRepository.removerCliente(id);
    return cliente;
  }
}