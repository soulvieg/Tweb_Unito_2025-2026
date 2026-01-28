package org.example.rdu.controllers;

import jakarta.servlet.http.HttpSession;
import org.example.rdu.dtos.SessionData;
import org.example.rdu.dtos.SessionRequest;
import org.example.rdu.dtos.UserResponseDTO;
import org.example.rdu.entities.User;
import org.example.rdu.mappers.UserMapper;
import org.example.rdu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SessionController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDTO> signup(@RequestBody SessionRequest request){
        User newUser = new User();
        newUser.setUsername(request.username());
        if(request.password().length() < 6){return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();}
        newUser.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(newUser);
        return new ResponseEntity<>(userMapper.toDto(newUser), HttpStatus.CREATED);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(HttpSession session, @RequestBody SessionRequest request) {
        return userRepository.findByUsername(request.username())
                .map(user -> {
                    if(passwordEncoder.matches(request.password(), user.getPassword())){
                        return ResponseEntity.ok("Login successful!!");
                    }else{
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credential");
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username not found, try signup"));
    }
}
