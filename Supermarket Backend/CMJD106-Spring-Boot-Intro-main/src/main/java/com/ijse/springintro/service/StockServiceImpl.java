package com.ijse.springintro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.springintro.entity.Stock;
import com.ijse.springintro.repository.StockRepository;

import java.util.List;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepository;

    @Override
    public List<Stock> getAllStockItems() {
        return stockRepository.findAll();
    }

    @Override
    public Stock getStockItemById(Long id) {
        return stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found!"));
    }

    @Override
    public Stock addOrUpdateStock(Stock stock) {
        return stockRepository.save(stock);
    }

    @Override
    public void deleteStockItem(Long id) {
        stockRepository.deleteById(id);
    }

    @Override
    public List<Stock> getLowStockItems(int restockLevel) {
        return stockRepository.findByQuantityLessThan(restockLevel);
    }

}
