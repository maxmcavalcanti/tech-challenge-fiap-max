// src/controllers/cliente.controller.ts
import { Request, Response } from 'express';

export interface PedidoController {
  create(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  remove(req: Request, res: Response): Promise<void>;
  getPaymentStatus(req: Request, res: Response): Promise<void>;
  changeStatus(req: Request, res: Response): Promise<void>;
  changePaymentStatus(req: Request, res: Response): Promise<void>;
}