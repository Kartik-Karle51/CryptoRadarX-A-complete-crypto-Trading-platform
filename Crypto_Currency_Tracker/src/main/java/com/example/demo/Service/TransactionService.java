package com.example.demo.Service;


import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Domain.WalletTransactionType;
import com.example.demo.Model.Wallet;
import com.example.demo.Model.WalletTransaction;
import com.example.demo.Repository.WalletTransactionRepo;


@Service
public class TransactionService {

    @Autowired
    private WalletTransactionRepo walletTransactionRepository;

   
    public List<WalletTransaction> getTransactionByWallet(Wallet wallet) {
        // Assuming the WalletTransactionRepository is set up to query by wallet
        return walletTransactionRepository.findByWallet(wallet);
    }


        public WalletTransaction createTransaction(Wallet wallet, WalletTransactionType transactionType, 
                                                   Long reference, String description, Long amount) {
            // Create a new WalletTransaction object
            WalletTransaction transaction = new WalletTransaction();
            
            // Set the properties
            transaction.setWallet(wallet);
            transaction.setType(transactionType);
            transaction.setDate(LocalDate.now());
            transaction.setTransferId(reference);  // Could be null
            transaction.setPurpose(description);
            transaction.setAmount(amount);
            
            // Save the transaction to the database
            return walletTransactionRepository.save(transaction);
        }
    
}
