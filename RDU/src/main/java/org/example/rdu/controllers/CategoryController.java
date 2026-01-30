package org.example.rdu.controllers;

import org.example.rdu.dtos.CategoryDTO;
import org.example.rdu.entities.Category;
import org.example.rdu.mappers.CategoryMapper;
import org.example.rdu.services.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CategoryController {

    @Autowired
    private ContentService contentService;

    @Autowired
    private CategoryMapper categoryMapper;


    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        List<Category> categories = contentService.findAllCategories();
        List<CategoryDTO> categoryDTOs = categories.stream()
                .map(categoryMapper::toDTO)
                .toList();
        return ResponseEntity.ok(categoryDTOs);
    }

}