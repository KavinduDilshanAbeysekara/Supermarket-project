package com.ijse.springintro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ijse.springintro.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
    // Custom query to find items below restock level
    List<Stock> findByQuantityLessThan(int restockLevel);
}
