package LaunchCode.project.service;

import LaunchCode.project.models.Transaction;

import java.util.List;

public interface TransactionService {
    public Transaction saveTransaction(Transaction transaction);
    public List<Transaction> getAllTransactions();
}
