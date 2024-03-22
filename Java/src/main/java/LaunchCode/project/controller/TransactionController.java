package LaunchCode.project.controller;

import LaunchCode.project.models.Transaction;
import LaunchCode.project.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
//@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/transactions/add")
    public String addTransaction(@RequestBody Transaction transaction) {
        transactionService.saveTransaction(transaction);
        return "New transaction saved";
    }

    @GetMapping("/transactions/getAll")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }
}
