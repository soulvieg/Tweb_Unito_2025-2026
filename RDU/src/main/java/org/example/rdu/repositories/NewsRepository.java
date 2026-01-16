package org.example.rdu.repositories;

import org.example.rdu.entities.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {
    public
    News findByNewsId(Integer newsId);
    public void deleteByNewsId(Integer id);
}
