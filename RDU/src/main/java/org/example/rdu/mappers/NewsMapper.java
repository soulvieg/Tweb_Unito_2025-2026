package org.example.rdu.mappers;

import org.example.rdu.dtos.NewsDTO;
import org.example.rdu.entities.Category;
import org.example.rdu.entities.News;
import org.springframework.stereotype.Component;

@Component
public class NewsMapper {
    public NewsDTO toDTO(News news) {
        if (news == null) {
            return null;
        }


        Integer categoryId = (news.getCategory() != null) ? news.getCategory().getCategoryId() : null;

        return new NewsDTO(
                news.getNewsId(),
                categoryId,
                news.getTitle(),
                news.getDescription(),
                news.getContent(),
                news.getImg(),
                news.getSrc(),
                news.getLocation(),
                news.getPublished_at()
        );
    }

    public News toEntity(NewsDTO newsDTO) {
        if (newsDTO == null) {
            return null;
        }

        News news = new News();
        news.setNewsId(newsDTO.newsId());
        news.setTitle(newsDTO.title());
        news.setDescription(newsDTO.description());
        news.setContent(newsDTO.content());
        news.setImg(newsDTO.img());
        news.setSrc(newsDTO.src());
        news.setLocation(newsDTO.location());
        news.setPublished_at(newsDTO.published_at());

        // Map Category ID to a Category "Stub"
        if (newsDTO.categoryId() != null) {
            Category category = new Category();
            category.setCategoryId(newsDTO.categoryId());
            news.setCategory(category);
        }

        return news;
    }
}
