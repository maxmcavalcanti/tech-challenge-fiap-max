import { Funcionario } from "../../entities/funcionario";
import FuncionarioRepository from "../../repositories/funcionario.repository";

class AutenticarFuncionarioUseCase {
  constructor(private funcionarioRepository: FuncionarioRepository) { }

  async execute(email: string, senha: string): Promise<Funcionario | null> {
    const funcionario = await this.funcionarioRepository.obterFuncionarioPorEmail(email);

    if (funcionario && funcionario.senha === senha) {
      return funcionario;
    }

    return null;
  }
}

export default AutenticarFuncionarioUseCase;
