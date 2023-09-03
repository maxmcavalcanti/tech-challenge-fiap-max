import { Cliente } from '../../../domain/entities/cliente';
import { ClienteRepository } from '../../../interfaces/repositories/cliente.repository.interface';


export class CriarClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) { }

  async execute(clienteData: Cliente): Promise<Cliente> {
    const cliente = await this.clienteRepository.criarCliente(clienteData);
    return cliente;
  }
}