package org.example.rdu.repositories;

import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{
    public List<Comment> findAllByPost(Post post);
    public Comment findByCommentId(Integer commentId);
    public  void deleteByCommentId(Integer commentId);
}
