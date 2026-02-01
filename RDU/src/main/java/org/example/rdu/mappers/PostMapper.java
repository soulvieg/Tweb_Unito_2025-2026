package org.example.rdu.mappers;

import org.example.rdu.dtos.PostDTO;
import org.example.rdu.entities.Post;
import org.example.rdu.entities.User;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {
    public PostDTO toDTO(Post post) {
        if (post == null) {
            return null;
        }

        Integer userId = (post.getAuthor() != null) ? post.getAuthor().getUserId() : null;

        return new PostDTO(
                post.getPostId(),
                userId,
                post.getTitle(),
                post.getText(),
                post.getCreationDate(),
                post.getCount_replies()
        );
    }

    public Post toEntity(PostDTO postDTO) {
        if (postDTO == null) {
            return null;
        }

        Post post = new Post();
        post.setPostId(postDTO.postId());
        post.setTitle(postDTO.title());
        post.setCreationDate(postDTO.creationDate());
        post.setCount_replies(postDTO.count_replies());


        if (postDTO.userId() != null) {
            User user = new User();
            user.setUserId(postDTO.userId());
            post.setAuthor(user);
        }

        return post;
    }

}
