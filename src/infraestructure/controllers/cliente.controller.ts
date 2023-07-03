// src/controllers/cliente.controller.ts
import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class ClienteController {
  async create(req: Request, res: Response) {
    try {
      const { nome, email, cpf, endereco } = req.body

      const alreadyRegister = await prisma.cliente.findFirst({ where: { cpf } })

      if (alreadyRegister) {
        res.status(400).json({ message: 'Usuário já cadastrado!' })
      }

      const cliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          cpf,
          endereco,
        },
      })
      res.status(201).json(cliente)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar cliente.' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const clientes = await prisma.cliente.findMany()
      res.json(clientes)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter clientes.' })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params

      const cliente = await prisma.cliente.findUnique({
        where: { id },
      })

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado!' })
      }

      res.json(cliente)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter cliente.' })
    }
  }

  async getByCPF(req: Request, res: Response) {
    try {
      const { cpf } = req.params

      const cliente = await prisma.cliente.findUnique({
        where: { cpf },
      })

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado.' })
      }

      res.json(cliente)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao obter cliente.' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { nome, email, cpf, endereco } = req.body

      const cliente = await prisma.cliente.update({
        where: { id },
        data: {
          nome,
          email,
          cpf,
          endereco,
        },
      })

      res.json(cliente)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao atualizar cliente.' })
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params

      await prisma.cliente.delete({
        where: { id },
      })

      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao remover cliente.' })
    }
  }
}

export default ClienteController
