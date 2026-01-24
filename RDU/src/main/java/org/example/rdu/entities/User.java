package org.example.rdu.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Entity
@Table(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="userId", nullable = false)
    @Getter
    private Integer userId;

    @Column(nullable = false, unique = true)
    @Getter
    @Setter
    private String username;

    @Column(nullable = false)
    @Getter
    @Setter
    private String password;

    @Column(name = "user_type", nullable = false)
    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private UserType userType;

    @OneToMany(mappedBy = "author")
    @Getter
    private List<Post> posts;

    @OneToMany(mappedBy = "author")
    @Getter
    private List<Comment> comments;
}
