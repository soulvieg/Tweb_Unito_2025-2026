package org.example.rdu.controllers;

import org.example.rdu.entities.News;
import org.example.rdu.repositories.NewsRepository;
import org.example.rdu.services.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "http://localhost:5173")
class NewsController {

    @Autowired
    private ContentService contentService;


    @GetMapping
    public ResponseEntity<List<News>> getAllNews() {
        return ResponseEntity.ok(contentService.findAllNews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Integer id) {
        return ResponseEntity.ok(contentService.findNewsById(id));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping
    public ResponseEntity<News> createNews(@RequestBody News news) {
        return ResponseEntity.status(201).body(contentService.saveNews(news));
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Integer id, @RequestBody News news){
        News newsUpdate = contentService.findNewsById(id);
        if(newsUpdate == null){return new ResponseEntity<>(HttpStatus.NOT_FOUND);}

        if(news.getTitle() != null){newsUpdate.setTitle(news.getTitle());}
        if(news.getDescription() != null){newsUpdate.setDescription(news.getDescription());}
        if(news.getContent() != null){newsUpdate.setContent(news.getContent());}
        if(news.getImg() != null){newsUpdate.setImg(news.getImg());}
        if(news.getSrc() != null){newsUpdate.setSrc(news.getSrc());}
        if(news.getLocation() != null){newsUpdate.setLocation(news.getLocation());}

        return new ResponseEntity<>(contentService.saveNews(newsUpdate), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNews(@PathVariable Integer id){
        News newsUpdate = contentService.findNewsById(id);
        if(newsUpdate == null){return ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found in the database");}
        contentService.deleteNews(id);
        return new ResponseEntity<>("News has been deleted", HttpStatus.OK);
    }



}
