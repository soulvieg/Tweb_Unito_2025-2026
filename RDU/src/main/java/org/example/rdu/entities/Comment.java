package org.example.rdu.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="commentId", nullable = false)
    @Getter
    @Setter
    private Integer commentId;

    @ManyToOne
    @JoinColumn(name = "postId", nullable = false)
    @Getter
    @Setter
    private Post post;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    @Getter
    @Setter
    private User author;

    @Column(columnDefinition = "TEXT", nullable = false)
    @Getter
    @Setter
    private String text;

    @Column(nullable = false)
    @Getter
    private Boolean muted = false;
}
