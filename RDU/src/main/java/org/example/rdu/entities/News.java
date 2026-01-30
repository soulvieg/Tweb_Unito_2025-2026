package org.example.rdu.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "news")
@NoArgsConstructor
@Getter
@Setter
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="newsId", nullable = false)
    private Integer newsId;

    private String title;

    private String description;

    private String content;

    private String img;

    private String src;

    private String location;

    private Timestamp published_at;

    @ManyToOne
    @JoinColumn(name="categoryId", nullable = false)
    private Category category;

}
