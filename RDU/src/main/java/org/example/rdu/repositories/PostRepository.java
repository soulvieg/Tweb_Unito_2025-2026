package org.example.rdu.repositories;

import org.example.rdu.entities.Post;
import org.example.rdu.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PostRepository extends JpaRepository<Post, Integer>{
    public List<Post> findAllByAuthor(User author);
    public Post findByPostId(Integer postId);
    public void deleteByPostId(Integer postId);
}
