package org.example.rdu.mappers;

import org.example.rdu.dtos.CategoryDTO;
import org.example.rdu.entities.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryDTO toDTO(Category category) {
        if (category == null) {
            return null;
        }
        return new CategoryDTO(
                category.getCategoryId(),
                category.getCategoryName()
        );
    }

    public Category toEntity(CategoryDTO categoryDTO) {
        if (categoryDTO == null) {
            return null;
        }
        Category category = new Category();
        category.setCategoryId(categoryDTO.categoryId());
        category.setCategoryName(categoryDTO.categoryName());
        return category;
    }
}
