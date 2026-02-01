package org.example.rdu.services;

import org.example.rdu.dtos.CreateNewsDTO;
import org.example.rdu.entities.Category;
import org.example.rdu.entities.News;
import org.example.rdu.repositories.CategoryRepository;
import org.example.rdu.repositories.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
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
    public News saveNews(CreateNewsDTO news) {
        News n = new News();
        Category category = categoryRepository.findByCategoryId(news.categoryId());
        n.setContent(news.content());
        n.setDescription(news.description());
        n.setImg(news.img());
        n.setLocation(news.location());
        n.setPublished_at(Timestamp.from(Instant.now()));
        n.setSrc(news.src());
        n.setTitle(news.title());
        if(category != null) n.setCategory(category);
        else throw new IllegalArgumentException("Category id is null");
        return newsRepository.save(n);
    }

    @Transactional
    public News updateNews(News news) {
        return newsRepository.save(news);
    }

    @Transactional
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    public Category findCategoryById(Integer id) {
        return categoryRepository.findByCategoryId(id);
    }


    @Transactional
    public void deleteNews(Integer id) {newsRepository.deleteByNewsId(id);}
}
