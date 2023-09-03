import { Cliente } from '../../domain/entities/cliente'

export interface ClienteRepository {
    criarCliente(cliente: Cliente): Promise<Cliente>;
    editarCliente(id: string, clienteData: Partial<Cliente>): Promise<Cliente>;
    obterClientePorId(id: string): Promise<Cliente | null>;
    obterClientes(): Promise<Cliente[]>;
    obterClientePorCPF(CPF: string): Promise<Cliente | null>
    removerCliente(id: string): Promise<void>;
}