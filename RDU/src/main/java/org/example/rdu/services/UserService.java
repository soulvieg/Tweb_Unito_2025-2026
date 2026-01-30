package org.example.rdu.services;

import org.example.rdu.entities.User;
import org.example.rdu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public List<User> findAllUser(){return userRepository.findAll();}

    @Transactional
    public User findUser(Integer id){return userRepository.findByUserId(id);}

    @Transactional
    public User saveUser(User user){return userRepository.save(user);}

    @Transactional
    public void deleteUser(Integer id){userRepository.deleteByUserId(id);}

}
