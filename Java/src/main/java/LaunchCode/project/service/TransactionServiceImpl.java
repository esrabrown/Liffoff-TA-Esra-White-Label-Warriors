package LaunchCode.project.service;

import LaunchCode.project.models.Transaction;
import LaunchCode.project.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService{
    @Autowired
    private TransactionRepository transactionRepository;
    @Override
    public void saveTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public List<Transaction> searchTransactionsByName(String name) {
        return transactionRepository.queryByName(name);
    }

    @Override
    public List<Transaction> searchTransactionsByAmount(double amount) {
        return transactionRepository.queryByAmount(amount);
    }
}
