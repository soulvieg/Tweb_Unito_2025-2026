package org.example.rdu.repositories;

import org.example.rdu.entities.Category;
import org.example.rdu.entities.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    public Category findByCategoryId(Integer categoryId);

}
