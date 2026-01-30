package org.example.rdu.services;

import org.example.rdu.entities.Category;
import org.example.rdu.entities.News;
import org.example.rdu.repositories.CategoryRepository;
import org.example.rdu.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContentService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private NewsRepository newsRepository;

    @Transactional
    public List<News> findAllNews() {return newsRepository.findAll();}

    @Transactional
    public News findNewsById(Integer id) {return newsRepository.findByNewsId(id);}

    @Transactional
    public News saveNews(News news) {return newsRepository.save(news);}

    @Transactional
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    public void deleteNews(Integer id) {newsRepository.deleteByNewsId(id);}
}
