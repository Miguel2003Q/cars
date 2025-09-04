package com.cars.cars.service;

import com.cars.cars.entity.Car;
import com.cars.cars.entity.User;
import com.cars.cars.exception.NotFoundException;
import com.cars.cars.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {
    
    private final CarRepository carRepository;
    
    public List<Car> getAllCarsByUser(User user) {
        return carRepository.findByUserId(user.getId());
    }
    
    public Car getCarByIdAndUser(Long carId, User user) {
        return carRepository.findByIdAndUserId(carId, user.getId())
                .orElseThrow(() -> new NotFoundException("Auto no encontrado"));
    }
    
    public Car createCar(Car car, User user) {
        if (carRepository.existsByLicensePlate(car.getLicensePlate())) {
            throw new RuntimeException("La placa ya existe");
        }
        
        car.setUser(user);
        return carRepository.save(car);
    }
    
    public Car updateCar(Long carId, Car carDetails, User user) {
        Car car = getCarByIdAndUser(carId, user);
        
        car.setBrand(carDetails.getBrand());
        car.setModel(carDetails.getModel());
        car.setYear(carDetails.getYear());
        car.setLicensePlate(carDetails.getLicensePlate());
        car.setColor(carDetails.getColor());
        
        return carRepository.save(car);
    }
    
    public void deleteCar(Long carId, User user) {
        Car car = getCarByIdAndUser(carId, user);
        carRepository.delete(car);
    }
}
