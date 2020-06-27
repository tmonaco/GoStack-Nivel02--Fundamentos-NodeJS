import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(t => t.type === 'income');
    const outcomeTransactions = this.transactions.filter(t => t.type === 'outcome');

    const income = !incomeTransactions || incomeTransactions.length === 0 ? 0 : incomeTransactions
                                              .map(t => t.value)
                                              .reduce((total, current) => total + current);
    const outcome = !outcomeTransactions || outcomeTransactions.length === 0 ? 0 : outcomeTransactions
                                              .map(t => t.value)
                                              .reduce((total, current) => total + current);
  
    return {
      income,
      outcome,
      total: income - outcome
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
