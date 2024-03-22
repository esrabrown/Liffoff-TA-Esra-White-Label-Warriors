package LaunchCode.project.service;

import LaunchCode.project.models.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TransactionService {
    void saveTransaction(Transaction transaction);
    List<Transaction> getAllTransactions();

    List<Transaction> searchTransactionsByName(String name);

    List<Transaction> searchTransactionsByAmount(double amount);
}
