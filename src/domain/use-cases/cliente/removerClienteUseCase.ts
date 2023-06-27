import { Cliente } from "../../entities/cliente";
import ClienteRepository from "../../repositories/cliente.repository";



export class RemoverClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(id: string): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.removerCliente(id);
    return cliente;
  }
}