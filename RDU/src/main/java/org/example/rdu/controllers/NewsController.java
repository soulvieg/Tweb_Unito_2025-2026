package org.example.rdu.controllers;

import org.example.rdu.entities.News;
import org.example.rdu.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping("/news")
class NewsController {

    @Autowired
    private NewsRepository newsRepository;

    @GetMapping
    public List<News> getAllUsers() {
        return newsRepository.findAll();
    }

}
