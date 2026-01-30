package org.example.rdu.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="categories")
@NoArgsConstructor
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="categoryId", nullable = false)
    private Integer categoryId;

    private String categoryName;

    @OneToMany(mappedBy = "category")
    private List<News> news;
}
