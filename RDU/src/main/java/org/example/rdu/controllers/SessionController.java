package org.example.rdu.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.rdu.dtos.SessionData;
import org.example.rdu.dtos.SessionRequest;
import org.example.rdu.dtos.UserResponseDTO;
import org.example.rdu.entities.User;
import org.example.rdu.entities.UserType;
import org.example.rdu.mappers.UserMapper;
import org.example.rdu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

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

        if(userRepository.findByUsername(request.username()) != null){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        User newUser = new User();
        newUser.setUsername(request.username());
        if(request.password().length() < 6){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        newUser.setPassword(passwordEncoder.encode(request.password()));

        newUser.setUserType(UserType.user);

        userRepository.save(newUser);
        return new ResponseEntity<>(userMapper.toDto(newUser), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<SessionData> login(HttpServletRequest req, @RequestBody SessionRequest request) {
        User userOpt = userRepository.findByUsername(request.username());

        if (userOpt == null || !passwordEncoder.matches(request.password(), userOpt.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userOpt;

        HttpSession session = req.getSession(true);

        session.setAttribute("userId", user.getUserId());
        session.setAttribute("username", user.getUsername());
        session.setAttribute("role", user.getUserType());

        // Create Spring Security authentication
        Collection<GrantedAuthority> authorities = user.getUserType() == UserType.admin
                ? Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
                : Collections.emptyList();

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(user.getUsername(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        SessionData response = new SessionData(user.getUserId(), user.getUsername(), user.getUserType(), "Login successful!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<SessionData> checkSession(HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Integer userId = (Integer) session.getAttribute("userId");
        UserType role = (UserType) session.getAttribute("role");

        return ResponseEntity.ok(new SessionData(userId, username, role, "Session active"));
    }
}
