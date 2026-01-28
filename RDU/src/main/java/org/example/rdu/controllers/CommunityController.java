package org.example.rdu.controllers;

import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Post;
import org.example.rdu.entities.Report;
import org.example.rdu.services.InteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/community")
@CrossOrigin(origins = "http://localhost:5173")
public class CommunityController {

    @Autowired
    private InteractionService interactionService;


    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(interactionService.findAllPosts());
    }


    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.status(201).body(interactionService.savePost(post));
    }


    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Integer postId) {
        return ResponseEntity.ok(interactionService.findCommentsByPostId(postId));
    }


    @PostMapping("/comments")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(interactionService.saveComment(comment));
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Integer id, @RequestBody Post postDetails) {
        return ResponseEntity.ok(interactionService.updatePost(id, postDetails));
    }

    @PostMapping("/reports")
    public ResponseEntity<Report> sendReport(@RequestBody Report report) {
        return ResponseEntity.ok(interactionService.saveReport(report));
    }


    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(interactionService.findAllReports());
    }
}