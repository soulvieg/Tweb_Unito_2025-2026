package org.example.rdu.mappers;

import org.example.rdu.dtos.CommentDTO;
import org.example.rdu.entities.Comment;
import org.springframework.stereotype.Component;

@Component
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


}
