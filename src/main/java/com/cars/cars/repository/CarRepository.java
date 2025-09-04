package com.cars.cars.repository;

import com.cars.cars.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    
    List<Car> findByUserId(Long userId);
    
    Optional<Car> findByIdAndUserId(Long id, Long userId);
    
    boolean existsByLicensePlate(String licensePlate);
}
