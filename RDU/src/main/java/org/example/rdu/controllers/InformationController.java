package org.example.rdu.controllers;

import org.example.rdu.entities.Category;
import org.example.rdu.entities.News;
import org.example.rdu.services.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/information")
@CrossOrigin(origins = "http://localhost:5173")
public class InformationController {

    @Autowired
    private ContentService contentService;

    @GetMapping("/news")
    public ResponseEntity<List<News>> getAllNews(@RequestParam(required = false) String category) {
        return ResponseEntity.ok(contentService.findAllNews(category));
    }


    @GetMapping("/news/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Integer id) {
        return ResponseEntity.ok(contentService.findNewsById(id));
    }


    @PostMapping("/news")
    public ResponseEntity<News> createNews(@RequestBody News news) {
        return ResponseEntity.status(201).body(contentService.saveNews(news));
    }


    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(contentService.findAllCategories());
    }

    @DeleteMapping("/news/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Integer id) {
        contentService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}