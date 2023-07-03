import { randomUUID } from "crypto";
import { ItemPedido } from "../../../domain/entities/itemPedido";
import ClienteRepository from "../../../interfaces/repositories/cliente.repository";
import { Cliente } from "@prisma/client";


export class CadastrarClienteUseCase {
    constructor(private clienteRepository: ClienteRepository) { }

    async execute(clienteData: Cliente): Promise<Cliente> {
        const cliente = await this.clienteRepository.criarCliente(clienteData);
        return cliente;
    }
}