// src/controllers/cliente.controller.ts
import { Request, Response } from 'express';

export interface ClienteController {
  create(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  getByCPF(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  remove(req: Request, res: Response): Promise<void>;
}