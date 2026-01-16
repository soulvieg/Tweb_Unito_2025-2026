package org.example.rdu.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "news")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Integer newsId;

    @Getter
    @Setter
    private String title;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private String content;

    @Getter
    @Setter
    private String img;

    @Getter
    @Setter
    private String src;

    @Getter
    @Setter
    private String location;

    @Getter
    @Setter
    private Timestamp published_at;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    @Getter
    @Setter
    private User author;

}
