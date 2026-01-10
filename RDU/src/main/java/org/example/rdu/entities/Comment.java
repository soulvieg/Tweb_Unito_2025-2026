package org.example.rdu.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;

    @ManyToOne
    @JoinColumn(name = "p_id", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "u_id", nullable = true)
    private User author;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;
}
