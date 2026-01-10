package org.example.rdu.repositories;

import org.example.rdu.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer>{
}
