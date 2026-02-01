package org.example.rdu.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="commentId", nullable = false, unique = true)
    private Integer commentId;

    @ManyToOne
    @JoinColumn(name = "postId", nullable = false)
    private Post post;


    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User author;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(nullable = false)
    private Boolean muted = false;

}
