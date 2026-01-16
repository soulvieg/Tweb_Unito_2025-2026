package org.example.rdu.controllers;


import org.example.rdu.dtos.UserResponseDTO;
import org.example.rdu.entities.User;
import org.example.rdu.entities.UserType;
import org.example.rdu.mappers.UserMapper;
import org.example.rdu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController{

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper mapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping
    public List<UserResponseDTO> getAlUsers(){
        return userRepository.findAll().stream()
                .map(mapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Integer id){
        User user = userRepository.findByUserId(id);
        return mapper.toDto(user);
    }

    @PostMapping
    public UserResponseDTO createUser(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);
        return mapper.toDto(saved);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User userDetail){
        User user = userRepository.findByUserId(id);
        if(user != null){
            if(userDetail.getUsername() != null) {
                user.setUsername(userDetail.getUsername());
            }
            if (userDetail.getPassword() != null && !userDetail.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDetail.getPassword()));
            }
            user.setPassword(userDetail.getPassword());

            if(userDetail.getUserType() != null){
                user.setUserType(user.getUserType());
            }else {
                user.setUserType(UserType.user);
            }
            return userRepository.save(user);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id){
        userRepository.deleteByUserId(id);
        return "User with id: "+id+"has been deleted!";
    }


}
