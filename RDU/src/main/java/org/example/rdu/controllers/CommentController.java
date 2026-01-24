package org.example.rdu.controllers;

import jakarta.transaction.Transactional;
import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Post;
import org.example.rdu.repositories.CommentRepository;
import org.example.rdu.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public ResponseEntity<List<Comment>> getAllPosts(){
        return new ResponseEntity(commentRepository.findAll(), HttpStatus.ACCEPTED);
    }

    @GetMapping("{/id}")
    public ResponseEntity<Comment> getComment(@PathVariable Integer id){
        return new ResponseEntity<>(commentRepository.findByCommentId(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post){
        post.setCreationDate(new Timestamp(System.currentTimeMillis()));
        return new ResponseEntity<>(postRepository.save(post), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Comment> updatePost(@PathVariable Integer id, @RequestBody Comment comment) {
        Comment commentUpdate = commentRepository.findByCommentId(id);
        if (commentUpdate == null) {return new ResponseEntity<>(HttpStatus.NOT_FOUND);}

        Post post = commentUpdate.getPost();
        post.setCount_replies(post.getCount_replies() +1);
        postRepository.save(post);

        if (comment.getText() != null){commentUpdate.setText(comment.getText());}

        return new ResponseEntity<>(commentRepository.save(commentUpdate), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Integer id){
        Comment commentUpdate = commentRepository.findByCommentId(id);
        if (commentUpdate == null) {return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");}

        commentRepository.deleteByCommentId(id);
        return new ResponseEntity<>("Post has been deleted", HttpStatus.OK);
    }

}
