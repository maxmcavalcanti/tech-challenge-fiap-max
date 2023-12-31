import { Cliente } from "../../../domain/entities/cliente";
import { ClienteRepository } from "../../../interfaces/repositories/cliente.repository.interface";


export class EditarClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(id: string, clienteData: Cliente): Promise<Cliente> {
    const cliente = await this.clienteRepository.editarCliente(id, clienteData);
    return cliente;
  }
}