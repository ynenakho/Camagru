import { Request, Response, NextFunction } from 'express';

export const setCache = (req: Request, res: Response, next: NextFunction) => {
  res.set('Cache-control', `no-cache`);
  next();
};
