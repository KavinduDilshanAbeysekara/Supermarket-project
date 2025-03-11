package com.ijse.springintro.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ijse.springintro.entity.Stock;
import com.ijse.springintro.service.StockService;

import java.util.List;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    
    private StockService stockService;

    @GetMapping
    public List<Stock> getAllStockItems() {
        
        return stockService.getAllStockItems();
    }

    @GetMapping("/{id}")
    public Stock getStockItemById(@PathVariable Long id) {
        return stockService.getStockItemById(id);
    }

    @PostMapping
    public Stock addOrUpdateStock(@RequestBody Stock stock) {
        return stockService.addOrUpdateStock(stock);
    }

    @DeleteMapping("/{id}")
    public void deleteStockItem(@PathVariable Long id) {
        stockService.deleteStockItem(id);
    }

    @GetMapping("/low-stock")
    public List<Stock> getLowStockItems(@RequestParam int restockLevel) {
        return stockService.getLowStockItems(restockLevel);
    }
}
