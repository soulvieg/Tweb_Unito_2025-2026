package org.example.rdu.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postId")
    @Getter
    private Integer postId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    @Getter
    @Setter
    private User author;

    @Column(nullable = false)
    @Getter
    @Setter
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    @Getter
    @Setter
    private String text;

    @Getter
    @Setter
    private Timestamp creationDate;

    @Getter
    @Setter
    private Integer count_replies;

    @OneToMany(mappedBy="post")
    @Getter
    private List<Comment> comments;

    public Post(){}
}
