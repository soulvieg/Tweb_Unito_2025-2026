package org.example.rdu.mappers;

import org.example.rdu.dtos.CommentDTO;
import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Post;
import org.example.rdu.entities.User;

public class CommentMapper {
    public CommentDTO toDTO(Comment comment) {
        if (comment == null) {
            return null;
        }

        Integer postId = (comment.getPost() != null) ? comment.getPost().getPostId() : null;
        Integer userId = (comment.getAuthor() != null) ? comment.getAuthor().getUserId() : null;

        return new CommentDTO(
                comment.getCommentId(),
                postId,
                userId,
                comment.getText(),
                comment.getCreatedAt(),
                comment.getMuted()
        );
    }

    public Comment toEntity(CommentDTO commentDTO) {
        if (commentDTO == null) {
            return null;
        }

        Comment comment = new Comment();
        comment.setCommentId(commentDTO.commentId());
        comment.setText(commentDTO.text());
        comment.setCreatedAt(commentDTO.timestamp());
        comment.setMuted(commentDTO.muted());

        if (commentDTO.postId() != null) {
            Post post = new Post();
            post.setPostId(commentDTO.postId());
            comment.setPost(post);
        }

        if (commentDTO.userId() != null) {
            User user = new User();
            user.setUserId(commentDTO.userId());
            comment.setAuthor(user);
        }

        return comment;
    }
}
