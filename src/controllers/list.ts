import { Request, Response } from 'express';
import { TransactionService } from '../services/list';

export const TransactionController = {
  getTransactionHistory: async (req: Request, res: Response) => {
    try {
      const transactions = await TransactionService.getTransactionHistory();
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
