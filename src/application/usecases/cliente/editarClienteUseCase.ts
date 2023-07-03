import { randomUUID } from "crypto";
import { ItemPedido } from "../../../domain/entities/itemPedido";
import { Cliente } from "../../../domain/entities/cliente";
import ClienteRepository from "../../../interfaces/repositories/cliente.repository";


export class EditarClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(id: string, clienteData: Partial<Cliente>): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.atualizarCliente(id, clienteData);
    return cliente;
  }
}