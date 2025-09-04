package com.cars.cars.controller;

import com.cars.cars.entity.Car;
import com.cars.cars.entity.User;
import com.cars.cars.service.AuthService;
import com.cars.cars.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.security.Principal;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CarController {
    
    private final CarService carService;
    private final AuthService authService;
    
    @GetMapping
    public List<Car> getAllCars(Principal principal) {
        User user = authService.getUserByUsername(principal.getName());
        return carService.getAllCarsByUser(user);
    }
    
    // Búsqueda por placa o modelo
    @GetMapping("/search")
    public List<Car> searchCars(@RequestParam String q, Principal principal) {
        User user = authService.getUserByUsername(principal.getName());
        return carService.searchCars(user, q);
    }
    
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id, Principal principal) {
        User user = authService.getUserByUsername(principal.getName());
        return carService.getCarByIdAndUser(id, user);
    }
    
    @PostMapping
    public Car createCar(@RequestBody Car car, Principal principal) {
        User user = authService.getUserByUsername(principal.getName());
        return carService.createCar(car, user);
    }
    
    @PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car car, Principal principal) {
        User user = authService.getUserByUsername(principal.getName());
        return carService.updateCar(id, car, user);
    }
    
    @DeleteMapping("/{id}")
    public String deleteCar(@PathVariable Long id, Principal principal) {
        User user = authService.getUserByUsername(principal.getName());
        carService.deleteCar(id, user);
        return "Auto eliminado exitosamente";
    }
}
