-- =============================================
-- Script de consultas de ejemplo para Cars App
-- Base de datos: MySQL
-- =============================================

-- =============================================
-- Consultas básicas
-- =============================================

-- 1. Listar todos los usuarios
SELECT id, username, email, created_at FROM users;

-- 2. Listar todos los autos con información del propietario
SELECT 
    c.id,
    c.brand,
    c.model,
    c.year,
    c.license_plate,
    c.color,
    u.username as owner,
    c.created_at
FROM cars c 
JOIN users u ON c.user_id = u.id 
ORDER BY u.username, c.brand;

-- 3. Contar autos por usuario
SELECT 
    u.username,
    u.email,
    COUNT(c.id) as total_cars
FROM users u 
LEFT JOIN cars c ON u.id = c.user_id 
GROUP BY u.id, u.username, u.email
ORDER BY total_cars DESC;

-- =============================================
-- Consultas de búsqueda
-- =============================================

-- 4. Buscar autos por marca
SELECT c.*, u.username as owner
FROM cars c 
JOIN users u ON c.user_id = u.id 
WHERE c.brand = 'Toyota';

-- 5. Buscar autos por año
SELECT c.*, u.username as owner
FROM cars c 
JOIN users u ON c.user_id = u.id 
WHERE c.year >= 2023
ORDER BY c.year DESC;

-- 6. Buscar autos por color
SELECT c.*, u.username as owner
FROM cars c 
JOIN users u ON c.user_id = u.id 
WHERE c.color = 'Azul';

-- 7. Buscar por placa (búsqueda exacta)
SELECT c.*, u.username as owner
FROM cars c 
JOIN users u ON c.user_id = u.id 
WHERE c.license_plate = 'ABC123';

-- 8. Buscar por placa (búsqueda parcial)
SELECT c.*, u.username as owner
FROM cars c 
JOIN users u ON c.user_id = u.id 
WHERE c.license_plate LIKE '%ABC%';

-- =============================================
-- Consultas estadísticas
-- =============================================

-- 9. Autos por marca (estadísticas)
SELECT 
    brand,
    COUNT(*) as total_cars,
    MIN(year) as oldest_year,
    MAX(year) as newest_year
FROM cars 
GROUP BY brand 
ORDER BY total_cars DESC;

-- 10. Autos por año (estadísticas)
SELECT 
    year,
    COUNT(*) as total_cars,
    GROUP_CONCAT(DISTINCT brand) as brands
FROM cars 
GROUP BY year 
ORDER BY year DESC;

-- 11. Colores más populares
SELECT 
    color,
    COUNT(*) as total_cars
FROM cars 
GROUP BY color 
ORDER BY total_cars DESC;

-- =============================================
-- Consultas de mantenimiento
-- =============================================

-- 12. Verificar integridad referencial
SELECT 
    'Autos sin usuario válido:' as check_type,
    COUNT(*) as count
FROM cars c 
LEFT JOIN users u ON c.user_id = u.id 
WHERE u.id IS NULL;

-- 13. Verificar placas duplicadas
SELECT 
    license_plate,
    COUNT(*) as count
FROM cars 
GROUP BY license_plate 
HAVING COUNT(*) > 1;

-- 14. Usuarios sin autos
SELECT u.*
FROM users u 
LEFT JOIN cars c ON u.id = c.user_id 
WHERE c.id IS NULL;

-- =============================================
-- Consultas de rendimiento
-- =============================================

-- 15. Top 5 usuarios con más autos
SELECT 
    u.username,
    u.email,
    COUNT(c.id) as total_cars
FROM users u 
LEFT JOIN cars c ON u.id = c.user_id 
GROUP BY u.id, u.username, u.email
ORDER BY total_cars DESC
LIMIT 5;

-- 16. Autos más recientes
SELECT c.*, u.username as owner
FROM cars c 
JOIN users u ON c.user_id = u.id 
ORDER BY c.created_at DESC
LIMIT 10;
