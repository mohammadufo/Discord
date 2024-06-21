import { Request } from 'express';

export interface IUpdatedRequest extends Request {
  profile?: {
    email: string;
  };
}
