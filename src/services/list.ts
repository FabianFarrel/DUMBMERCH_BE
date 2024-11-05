import { TransactionRepository } from '../repositories/list';

export const TransactionService = {
  getTransactionHistory: async () => {
    return await TransactionRepository.getAllTransactions();
  },
};
