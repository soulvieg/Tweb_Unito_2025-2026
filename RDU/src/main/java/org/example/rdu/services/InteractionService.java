package org.example.rdu.services;

import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Post;
import org.example.rdu.entities.Report;
import org.example.rdu.repositories.CommentRepository;
import org.example.rdu.repositories.PostRepository;
import org.example.rdu.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InteractionService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ReportRepository reportRepository;
    
    public List<Post> findAllPosts() {return postRepository.findAll();}


    public Post savePost(Post post) {return postRepository.save(post);}


    public List<Comment> findCommentsByPostId(Integer postId){

        Post post = postRepository.findByPostId(postId);
        if(post == null){return null;}

        return commentRepository.findAllByPost(post);
    }


    public Comment saveComment(Comment comment) {
        Post post = comment.getPost();

        post.setCount_replies(post.getCount_replies() + 1);

        return commentRepository.save(comment);
    }


    public Post updatePost(Integer id, Post postDetails) {

        Post post = postRepository.findByPostId(id);
        if(postDetails == null){return null;}

        if(postDetails.getTitle() != null){post.setTitle(postDetails.getTitle());}
        if(postDetails.getText() != null){post.setText(postDetails.getText());}

        return postRepository.save(post);
    }


    public Report saveReport(Report report) {return reportRepository.save(report);}


    public List<Report> findAllReports() {
        return reportRepository.findAll();
    }
}
