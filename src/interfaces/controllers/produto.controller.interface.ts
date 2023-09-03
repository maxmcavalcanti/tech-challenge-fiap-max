import { Request, Response } from 'express';

export interface ProdutoController {
  create(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  remove(req: Request, res: Response): Promise<void>;
  getByCategory(req: Request, res: Response): Promise<void>;
}