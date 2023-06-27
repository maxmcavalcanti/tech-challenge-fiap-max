import { randomUUID } from "crypto";
import { ItemPedido } from "../../entities/itemPedido";
import { Cliente } from "../../entities/cliente";
import ClienteRepository from "../../repositories/cliente.repository";


export class CadastrarClienteUseCase {
    constructor(private clienteRepository: ClienteRepository) { }

    async execute(clienteData: Partial<Cliente>): Promise<Cliente> {
        const cliente = await this.clienteRepository.criarCliente(clienteData);
        return cliente;
    }
}