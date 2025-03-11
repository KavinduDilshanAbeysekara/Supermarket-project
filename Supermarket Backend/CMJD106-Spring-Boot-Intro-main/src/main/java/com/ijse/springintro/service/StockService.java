package com.ijse.springintro.service;

import java.util.List;

import com.ijse.springintro.entity.Stock;

public interface StockService {
    List<Stock> getAllStockItems();
    Stock getStockItemById(Long id);
    Stock addOrUpdateStock(Stock stock);
    void deleteStockItem(Long id);
    List<Stock> getLowStockItems(int restockLevel);
}
