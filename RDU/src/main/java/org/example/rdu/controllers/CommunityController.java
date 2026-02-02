package org.example.rdu.controllers;

import org.example.rdu.dtos.*;
import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Post;
import org.example.rdu.entities.Report;
import org.example.rdu.mappers.CommentMapper;
import org.example.rdu.mappers.PostMapper;
import org.example.rdu.mappers.ReportMapper;
import org.example.rdu.services.InteractionService;
import org.example.rdu.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/community")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CommunityController {

    @Autowired
    private InteractionService interactionService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private ReportMapper reportMapper;


    @GetMapping("/posts")
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        List<Post> posts = interactionService.findAllPosts();
        List<PostDTO> postDTOs = posts.stream()
                .map(postMapper::toDTO)
                .toList();
        return ResponseEntity.ok(postDTOs);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<PostDTO> getPost(@PathVariable Integer id) {
        Post post = interactionService.findPost(id);
        return ResponseEntity.ok(postMapper.toDTO(post));
    }


    @PostMapping("/posts")
    public ResponseEntity<PostDTO> createPost(@RequestBody CreatePostDTO post) {
        Post createdPost = interactionService.savePost(post);
        return ResponseEntity.status(201).body(postMapper.toDTO(createdPost));
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable Integer id, @RequestBody Post postDetails) {
        Post updatedPost = interactionService.updatePost(id, postDetails);
        return ResponseEntity.ok(postMapper.toDTO(updatedPost));
    }

    @DeleteMapping("/posts/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deletePost(@PathVariable Integer id){
        interactionService.deletePost(id);
        return new ResponseEntity<>("Post has been deleted", HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<CommentDTO>> getCommentsByPost(@PathVariable Integer postId) {
        List<Comment> comments = interactionService.findCommentsByPostId(postId);
        List<CommentDTO> commentDTOs = comments.stream()
                .map(commentMapper::toDTO)
                .toList();
        return ResponseEntity.ok(commentDTOs);
    }

    @PostMapping("/comments")
    public ResponseEntity<CommentDTO> addComment(@RequestBody CreateCommentDTO comment) {
        Comment createdComment = interactionService.saveComment(comment);
        return ResponseEntity.ok(commentMapper.toDTO(createdComment));
    }

    @PutMapping("/comments/{id}/mute")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CommentDTO> muteComment(@PathVariable Integer id) {
        Comment toggledComment = interactionService.muteComment(id);
        if (toggledComment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(commentMapper.toDTO(toggledComment));
    }


    @PostMapping("/reports")
    public ResponseEntity<ReportDTO> sendReport(@RequestBody CreateReportDTO createReportDTO) {
        Report createdReport = interactionService.saveReport(createReportDTO);
        return ResponseEntity.ok(reportMapper.toDTO(createdReport));
    }


    @GetMapping("/reports")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReportDTO>> getAllReports() {
        List<Report> reports = interactionService.findAllReports();
        List<ReportDTO> reportDTOs = reports.stream()
                .map(reportMapper::toDTO)
                .toList();
        return ResponseEntity.ok(reportDTOs);
    }
}