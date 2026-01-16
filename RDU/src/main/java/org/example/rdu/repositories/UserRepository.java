package org.example.rdu.repositories;

import org.example.rdu.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public User findByUserId(Integer userId);
    public void deleteByUserId(Integer userId);
    Optional<User> findByUsername(String username);
}
