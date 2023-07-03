// src/controllers/funcionario.controller.ts
import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class FuncionarioController {
  async create(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body

      const funcionario = await prisma.funcionario.create({
        data: {
          nome,
          email,
          senha,
        },
      })

      res.status(201).json(funcionario)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar funcionário.' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const funcionarios = await prisma.funcionario.findMany()
      res.json(funcionarios)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter funcionários.' })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const funcionario = await prisma.funcionario.findUnique({
        where: { id },
      })

      if (!funcionario) {
        return res.status(404).json({ message: 'Funcionário não encontrado.' })
      }

      res.json(funcionario)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter funcionário.' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { nome, email, senha } = req.body

      const funcionario = await prisma.funcionario.update({
        where: { id },
        data: {
          nome,
          email,
          senha,
        },
      })

      res.json(funcionario)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao atualizar funcionário.' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params

      await prisma.funcionario.delete({
        where: { id },
      })

      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao remover funcionário.' })
    }
  }
  async authenticate(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const funcionario = await prisma.funcionario.findUnique({
        where: { email },
      });

      if (!funcionario || funcionario.senha !== senha) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      // Aqui você pode gerar um token de autenticação, como JWT, para ser usado nas requisições subsequentes

      res.json({ message: 'Autenticação bem-sucedida.', token: 'SEU_TOKEN_AQUI' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao autenticar funcionário.' });
    }
  }

}

export default FuncionarioController
