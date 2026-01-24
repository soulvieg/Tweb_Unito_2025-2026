package org.example.rdu.controllers;


import org.example.rdu.entities.Post;
import org.example.rdu.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(){
        return new ResponseEntity(postRepository.findAll(), HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Integer id){
        return new ResponseEntity<>(postRepository.findByPostId(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post){
        post.setCreationDate(new Timestamp(System.currentTimeMillis()));
        return new ResponseEntity<>(postRepository.save(post), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Integer id, @RequestBody Post post) {
        Post postUpdate = postRepository.findByPostId(id);
        if (postUpdate == null) {return new ResponseEntity<>(HttpStatus.NOT_FOUND);}

        if (post.getText() != null) {postUpdate.setText(post.getText());}
        if (post.getTitle() != null) {postUpdate.setTitle(post.getTitle());}

        return new ResponseEntity<>(postRepository.save(postUpdate), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Integer id){
        Post postUpdate = postRepository.findByPostId(id);
        if (postUpdate == null) {return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");}

        postRepository.deleteByPostId(id);
        return new ResponseEntity<>("Post has been deleted", HttpStatus.OK);
    }

}
