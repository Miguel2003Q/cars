package com.cars.cars.controller;

import com.cars.cars.entity.User;
import com.cars.cars.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        String token = authService.register(user);
        User savedUser = authService.getUserByUsername(user.getUsername());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
            "id", savedUser.getId(),
            "username", savedUser.getUsername(),
            "email", savedUser.getEmail(),
            "firstName", savedUser.getFirstName(),
            "lastName", savedUser.getLastName()
        ));
        return response;
    }
    
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        String token = authService.login(user.getUsername(), user.getPassword());
        User loggedUser = authService.getUserByUsername(user.getUsername());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
            "id", loggedUser.getId(),
            "username", loggedUser.getUsername(),
            "email", loggedUser.getEmail(),
            "firstName", loggedUser.getFirstName(),
            "lastName", loggedUser.getLastName()
        ));
        return response;
    }
}
