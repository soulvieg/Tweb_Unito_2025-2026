package org.example.rdu.controllers;

import org.example.rdu.entities.News;
import org.example.rdu.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/news")
class NewsController {

    @Autowired
    private NewsRepository newsRepository;

    @GetMapping
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNews(@PathVariable Integer id) {
        return new ResponseEntity<>(newsRepository.findByNewsId(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<News> createNews(@RequestBody News news){
        news.setPublished_at(new Timestamp(System.currentTimeMillis()));
        return new ResponseEntity<>(newsRepository.save(news), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Integer id, @RequestBody News news){
        News newsUpdate = newsRepository.findByNewsId(id);
        if(newsUpdate == null){return new ResponseEntity<>(HttpStatus.NOT_FOUND);}

        if(news.getTitle() != null){newsUpdate.setTitle(news.getTitle());}
        if(news.getDescription() != null){newsUpdate.setDescription(news.getDescription());}
        if(news.getContent() != null){newsUpdate.setContent(news.getContent());}
        if(news.getImg() != null){newsUpdate.setImg(news.getImg());}
        if(news.getSrc() != null){newsUpdate.setSrc(news.getSrc());}
        if(news.getLocation() != null){newsUpdate.setLocation(news.getLocation());}

        return new ResponseEntity<>(newsRepository.save(newsUpdate), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNews(@PathVariable Integer id){
        News newsUpdate = newsRepository.findByNewsId(id);
        if(newsUpdate == null){return ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found in the database");}

        newsRepository.delete(newsUpdate);
        return new ResponseEntity<>("News has been deleted", HttpStatus.OK);
    }



}
