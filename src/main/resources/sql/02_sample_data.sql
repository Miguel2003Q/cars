-- =============================================
-- Script de datos de prueba para Cars App
-- Base de datos: MySQL
-- =============================================

-- =============================================
-- Insertar usuarios de prueba
-- =============================================
INSERT INTO users (username, email, password) VALUES
('admin', 'admin@cars.com', '$2a$10$LCHfeqFR.qh2rMqt.kEsdOVj5Jo/7wsuut3XvQN/IGhOOZUvDEwV6'),
('juan', 'juan@email.com', '$2a$10$LCHfeqFR.qh2rMqt.kEsdOVj5Jo/7wsuut3XvQN/IGhOOZUvDEwV6'),
('maria', 'maria@email.com', '$2a$10$LCHfeqFR.qh2rMqt.kEsdOVj5Jo/7wsuut3XvQN/IGhOOZUvDEwV6'),
('carlos', 'carlos@email.com', '$2a$10$LCHfeqFR.qh2rMqt.kEsdOVj5Jo/7wsuut3XvQN/IGhOOZUvDEwV6');

-- =============================================
-- Insertar autos de prueba
-- =============================================
INSERT INTO cars (brand, model, year, license_plate, color, user_id) VALUES
-- Autos del usuario admin (id=1)
('Toyota', 'Corolla', 2023, 'ABC123', 'Blanco', 1),
('Honda', 'Civic', 2022, 'DEF456', 'Azul', 1),
('Ford', 'Focus', 2021, 'GHI789', 'Rojo', 1),

-- Autos del usuario juan (id=2)
('Nissan', 'Sentra', 2023, 'JKL012', 'Negro', 2),
('Chevrolet', 'Cruze', 2022, 'MNO345', 'Gris', 2),

-- Autos del usuario maria (id=3)
('Volkswagen', 'Jetta', 2024, 'PQR678', 'Blanco', 3),
('Hyundai', 'Elantra', 2023, 'STU901', 'Azul', 3),
('Kia', 'Forte', 2022, 'VWX234', 'Rojo', 3),

-- Autos del usuario carlos (id=4)
('Mazda', 'Mazda3', 2023, 'YZA567', 'Negro', 4),
('Subaru', 'Impreza', 2024, 'BCD890', 'Azul', 4);

-- =============================================
-- Verificar datos insertados
-- =============================================
SELECT 'Usuarios creados:' as info;
SELECT id, username, email, created_at FROM users;

SELECT 'Autos creados:' as info;
SELECT c.id, c.brand, c.model, c.year, c.license_plate, c.color, u.username as owner
FROM cars c 
JOIN users u ON c.user_id = u.id 
ORDER BY u.username, c.brand;

-- =============================================
-- Estadísticas
-- =============================================
SELECT 
    'Estadísticas:' as info,
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM cars) as total_cars,
    (SELECT COUNT(DISTINCT brand) FROM cars) as unique_brands;
