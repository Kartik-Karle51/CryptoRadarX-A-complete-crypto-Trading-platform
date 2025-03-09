package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.demo.Model.PaymentOrder;

public interface PaymentRepo extends JpaRepository<PaymentOrder, Long>{

}
