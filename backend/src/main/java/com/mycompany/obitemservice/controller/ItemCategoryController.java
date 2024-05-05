package com.mycompany.obitemservice.controller;

import com.mycompany.obitemservice.model.ItemCategoryModel;
import com.mycompany.obitemservice.repository.ItemCategoryRepository;
import com.mycompany.obitemservice.repository.ItemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ItemCategoryController {

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/categories")
    public List<ItemCategoryModel> getAllItemCategory() {
        return itemCategoryRepository.findAll();
    }

    @GetMapping("/categories/{id}")
    public ItemCategoryModel getItemCategory(@PathVariable String id) {
        return itemCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Cannot Find Item Category By ID: " + id));
    }

    @PostMapping("/categories")
    public ResponseEntity<String> saveItemCategory(@RequestBody ItemCategoryModel categoryModel) {
        ItemCategoryModel savedItem = itemCategoryRepository.insert(categoryModel);//it will create new document in table with autogenerated id, if id exist than exception in is thrown
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedItem.getId())
                .toUri();
        //http://localhost:8081/api/v1/categories/611b7bcfef59e87f2e0e0d60
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ItemCategoryModel> updateItemCategory(@PathVariable String id, @RequestBody ItemCategoryModel item) {
        ItemCategoryModel imFromDB = itemCategoryRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot Find Item Category By ID: " + id));
        BeanUtils.copyProperties(item, imFromDB);//copy all data from item to imFromDB
        imFromDB = itemCategoryRepository.save(imFromDB);//if request has id than it will update else it will insert new document with new autogenerated id
        return new ResponseEntity<>(imFromDB, HttpStatus.OK);
    }

    @DeleteMapping("/categories/{id}")
    public void deleteItemCategory(@PathVariable String id) {
        itemCategoryRepository.deleteById(id);

    }
    @PatchMapping("/categories/{id}")
    public ResponseEntity<ItemCategoryModel> patchItemCategory(@PathVariable String id, @RequestBody ItemCategoryModel categoryModel) {
        ItemCategoryModel imFromDB = itemCategoryRepository.findById(id).orElseThrow(()->new RuntimeException("Cannot Find Item Category By ID: " + id));

        imFromDB.setName(categoryModel.getName());
        imFromDB = itemCategoryRepository.save(imFromDB);
        return new ResponseEntity<>(imFromDB, HttpStatus.OK);
    }

}