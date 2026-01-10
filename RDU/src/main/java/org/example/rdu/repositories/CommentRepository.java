package org.example.rdu.repositories;

import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer>{

    List<Comment> findAllByPost(Post post);
}
