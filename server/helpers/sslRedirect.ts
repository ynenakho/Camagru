import { Request, Response, NextFunction } from 'express';

export const sslRedirect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.header('x-forwarded-proto') !== 'https')
    res.redirect(`https://${req.header('host')}${req.url}`);
  else next();
};
