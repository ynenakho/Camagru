import HttpError from './HttpError';
import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

type Response = {
  [key: string]: string | number | null | string[] | undefined;
  message: string;
  status: number;
};

const errorData = (err: any): Response => {
  if (err instanceof HttpError) {
    return {
      name: HttpError.Messages[err.status],
      status: err.status,
      message: err.message,
    };
  } else if (err.name === 'MongoError') {
    return {
      name: 'MongoDB Error',
      status: 500,
      message: 'Database error',
    };
  } else {
    return {
      name: HttpError.Messages[500],
      status: 500,
      message: err.message,
    };
  }
};

const handler: ErrorRequestHandler = (err, req, res, next) => {
  const error = errorData(err);
  return res.status(error.status).json(error);
};

export default handler;
