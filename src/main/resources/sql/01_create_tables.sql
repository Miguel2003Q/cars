-- =============================================
-- Script de creación de tablas para Cars App
-- Base de datos: MySQL
-- =============================================

-- Crear base de datos (opcional)
-- CREATE DATABASE IF NOT EXISTS cars_db;
-- USE cars_db;

-- =============================================
-- Tabla: users
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- Tabla: cars
-- =============================================
CREATE TABLE IF NOT EXISTS cars (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    color VARCHAR(30) NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Clave foránea
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Índices para mejor rendimiento
    INDEX idx_user_id (user_id),
    INDEX idx_license_plate (license_plate),
    INDEX idx_brand (brand),
    INDEX idx_year (year)
);

-- =============================================
-- Comentarios de las tablas
-- =============================================
ALTER TABLE users COMMENT = 'Tabla de usuarios del sistema';
ALTER TABLE cars COMMENT = 'Tabla de autos registrados por los usuarios';

-- =============================================
-- Verificar creación de tablas
-- =============================================
SHOW TABLES;
DESCRIBE users;
DESCRIBE cars;
