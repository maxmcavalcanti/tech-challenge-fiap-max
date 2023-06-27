import { randomUUID } from "crypto";
import { ItemPedido } from "../../entities/itemPedido";
import { Cliente } from "../../entities/cliente";
import ClienteRepository from "../../repositories/cliente.repository";


export class EditarClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(id: string, clienteData: Partial<Cliente>): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.atualizarCliente(id, clienteData);
    return cliente;
  }
}