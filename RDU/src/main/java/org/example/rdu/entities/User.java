package org.example.rdu.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}
