package org.example.rdu.services;

import org.example.rdu.dtos.CreateCommentDTO;
import org.example.rdu.dtos.CreatePostDTO;
import org.example.rdu.dtos.CreateReportDTO;
import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Post;
import org.example.rdu.entities.Report;
import org.example.rdu.entities.User;
import org.example.rdu.repositories.CommentRepository;
import org.example.rdu.repositories.PostRepository;
import org.example.rdu.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
public class InteractionService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserService userService;


    @Autowired
    private ReportRepository reportRepository;

    @Transactional
    public List<Post> findAllPosts() {return postRepository.findAll();}

    @Transactional
    public Post findPost(Integer postId) {return postRepository.findByPostId(postId);}

    @Transactional
    public Post savePost(CreatePostDTO post) {
        Post p = new Post();
        User author = userService.findUser(post.userId());

        p.setCount_replies(0);
        p.setCreationDate(Timestamp.from(Instant.now()));
        p.setTitle(post.title());
        p.setText(post.text());

        if(author != null) p.setAuthor(author);
        return postRepository.save(p);
    }

    @Transactional
    public List<Comment> findCommentsByPostId(Integer postId){

        Post post = postRepository.findByPostId(postId);
        if(post == null){return null;}

        return commentRepository.findAllByPost(post);
    }

    @Transactional
    public Comment saveComment(CreateCommentDTO comment) {
        Comment c = new Comment();
        User author = userService.findUser(comment.userId());
        Post post = findPost(comment.postId());

        c.setMuted(false);
        c.setText(comment.text());
        c.setCreatedAt(Timestamp.from(Instant.now()));
        if(author != null) c.setAuthor(author);
        if(post != null) c.setPost(post);

        post.setCount_replies(post.getCount_replies() + 1);
        postRepository.save(post);
        return commentRepository.save(c);
    }

    @Transactional
    public Post updatePost(Integer id, Post postDetails) {

        Post post = postRepository.findByPostId(id);
        if(postDetails == null){return null;}

        if(postDetails.getTitle() != null){post.setTitle(postDetails.getTitle());}
        if(postDetails.getText() != null){post.setText(postDetails.getText());}

        return postRepository.save(post);
    }

    @Transactional
    public void deletePost(Integer id) {
        List<Comment> comments = commentRepository.findAllByPost(postRepository.findByPostId(id));
        commentRepository.deleteAll(comments);
        postRepository.deleteById(id);
    }

    @Transactional
    public Comment muteComment(Integer commentId) {
        Comment comment = commentRepository.findById(commentId).orElse(null);
        if (comment != null) {
            comment.setMuted(!comment.getMuted());
            return commentRepository.save(comment);
        }
        return null;
    }

    @Transactional
    public Report saveReport(CreateReportDTO createReportDTO) {
        Comment comment = commentRepository.findById(createReportDTO.commentId()).orElse(null);
        User reporter = userService.findUser(createReportDTO.reporterId());

        if (comment == null || reporter == null) {
            throw new RuntimeException("Comment or User not found");
        }

        Report report = new Report();
        report.setComment(comment);
        report.setReporter(reporter);
        report.setReason(createReportDTO.reason());
        report.setCreatedAt(Timestamp.from(Instant.now()));
        return reportRepository.save(report);
    }

    @Transactional
    public List<Report> findAllReports() {
        return reportRepository.findAll();
    }
}
