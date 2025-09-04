package com.cars.cars.controller;

import com.cars.cars.entity.Car;
import com.cars.cars.entity.User;
import com.cars.cars.service.AuthService;
import com.cars.cars.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CarController {
    
    private final CarService carService;
    private final AuthService authService;
    
    @GetMapping
    public List<Car> getAllCars() {
        User user = authService.getUserByUsername("user");
        return carService.getAllCarsByUser(user);
    }
    
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        User user = authService.getUserByUsername("user");
        return carService.getCarByIdAndUser(id, user);
    }
    
    @PostMapping
    public Car createCar(@RequestBody Car car) {
        User user = authService.getUserByUsername("user");
        return carService.createCar(car, user);
    }
    
    @PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car car) {
        User user = authService.getUserByUsername("user");
        return carService.updateCar(id, car, user);
    }
    
    @DeleteMapping("/{id}")
    public String deleteCar(@PathVariable Long id) {
        User user = authService.getUserByUsername("user");
        carService.deleteCar(id, user);
        return "Car deleted successfully";
    }
}
