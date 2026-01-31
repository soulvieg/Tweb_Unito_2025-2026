package org.example.rdu.services;

import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Post;
import org.example.rdu.entities.Report;
import org.example.rdu.repositories.CommentRepository;
import org.example.rdu.repositories.PostRepository;
import org.example.rdu.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InteractionService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Transactional
    public List<Post> findAllPosts() {return postRepository.findAll();}

    @Transactional
    public Post savePost(Post post) {return postRepository.save(post);}

    @Transactional
    public List<Comment> findCommentsByPostId(Integer postId){

        Post post = postRepository.findByPostId(postId);
        if(post == null){return null;}

        return commentRepository.findAllByPost(post);
    }

    @Transactional
    public Comment saveComment(Comment comment) {
        Post post = comment.getPost();

        post.setCount_replies(post.getCount_replies() + 1);

        return commentRepository.save(comment);
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
    public Report saveReport(Report report) {return reportRepository.save(report);}

    @Transactional
    public List<Report> findAllReports() {
        return reportRepository.findAll();
    }
}
