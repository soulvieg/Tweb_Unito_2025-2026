package org.example.rdu.controllers;


import org.example.rdu.dtos.UserResponseDTO;
import org.example.rdu.entities.User;
import org.example.rdu.entities.UserType;
import org.example.rdu.mappers.UserMapper;
import org.example.rdu.repositories.UserRepository;
import org.example.rdu.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController{

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<UserResponseDTO> getAlUsers(){
        return userService.findAllUser().stream()
                .map(mapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Integer id){
        User user = userService.findUser(id);
        return mapper.toDto(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
        return new ResponseEntity<>("News has been deleted", HttpStatus.OK);
    }


}
