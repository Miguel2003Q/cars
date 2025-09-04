# Guía de Pruebas en Postman - Cloudinary Integration

## 🚀 Configuración Inicial

### 1. Ejecutar la Aplicación
```bash
# En la terminal, desde la carpeta del proyecto:
.\mvnw.cmd spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`

### 2. Configurar Postman
- Crear una nueva colección llamada "Cars API"
- Configurar variable de entorno `baseUrl` = `http://localhost:8080`

## 📋 Secuencia de Pruebas

### **Paso 1: Registro de Usuario**
```http
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123",
  "email": "test@example.com"
}
```

### **Paso 2: Login**
```http
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Guarda el `token` de la respuesta para usarlo en las siguientes peticiones.**

### **Paso 3: Crear un Auto**
```http
POST {{baseUrl}}/api/cars
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2023,
  "licensePlate": "ABC123",
  "color": "Blanco"
}
```

**Guarda el `id` del auto creado.**

### **Paso 4: Subir Foto del Auto** ⭐
```http
POST {{baseUrl}}/api/cars/{carId}/upload-photo
Authorization: Bearer {{token}}
Content-Type: multipart/form-data

Body (form-data):
- Key: file
- Type: File
- Value: [Selecciona una imagen desde tu computadora]
```

**Respuesta esperada:**
```json
{
  "message": "Foto subida exitosamente",
  "imageUrl": "https://res.cloudinary.com/di5zocq4s/image/upload/v1234567890/cars/auto123.jpg"
}
```

### **Paso 5: Verificar Foto Subida**
```http
GET {{baseUrl}}/api/cars/{carId}/photo
Authorization: Bearer {{token}}
```

### **Paso 6: Obtener Auto con Foto**
```http
GET {{baseUrl}}/api/cars/{carId}
Authorization: Bearer {{token}}
```

**Debería incluir el campo `photoUrl` con la URL de Cloudinary.**

### **Paso 7: Actualizar Foto**
```http
PUT {{baseUrl}}/api/cars/{carId}/update-photo
Authorization: Bearer {{token}}
Content-Type: multipart/form-data

Body (form-data):
- Key: file
- Type: File
- Value: [Selecciona una imagen diferente]
```

### **Paso 8: Eliminar Foto**
```http
DELETE {{baseUrl}}/api/cars/{carId}/delete-photo
Authorization: Bearer {{token}}
```

## 🔍 Verificaciones Importantes

### ✅ **Verificar en Cloudinary Dashboard**
1. Ve a [cloudinary.com/console](https://cloudinary.com/console)
2. Inicia sesión con tu cuenta
3. Ve a "Media Library"
4. Busca la carpeta "cars"
5. Deberías ver las imágenes subidas

### ✅ **Verificar URLs Generadas**
Las URLs deben tener este formato:
```
https://res.cloudinary.com/di5zocq4s/image/upload/v[timestamp]/cars/[filename].[ext]
```

### ✅ **Verificar Optimización**
- Las imágenes se optimizan automáticamente
- Se convierten a formatos modernos (WebP, AVIF)
- Se comprimen sin perder calidad

## 🐛 Solución de Problemas

### **Error 401 - Unauthorized**
- Verifica que el token JWT sea válido
- Asegúrate de incluir `Authorization: Bearer {token}`

### **Error 404 - Not Found**
- Verifica que el `carId` sea correcto
- Asegúrate de que el auto pertenezca al usuario autenticado

### **Error 400 - Bad Request**
- Verifica que el archivo sea una imagen válida
- Asegúrate de usar `multipart/form-data`
- Verifica que el campo se llame `file`

### **Error de Cloudinary**
- Verifica las credenciales en `application.properties`
- Asegúrate de que la cuenta de Cloudinary esté activa
- Verifica la conexión a internet

## 📸 Tipos de Archivo Soportados

- **Imágenes**: JPG, JPEG, PNG, GIF, WebP, AVIF, SVG
- **Tamaño máximo**: 10MB (configurable en Cloudinary)
- **Formatos recomendados**: JPG, PNG

## 🎯 Resultados Esperados

1. **Subida exitosa**: Imagen visible en Cloudinary Dashboard
2. **URL válida**: Enlace funcional que muestra la imagen
3. **Optimización**: Imagen cargada rápidamente
4. **Persistencia**: URL guardada en base de datos
5. **Seguridad**: Solo el propietario puede gestionar las fotos

## 📊 Monitoreo

### **Logs de la Aplicación**
Busca estos mensajes en la consola:
```
INFO - Imagen subida exitosamente: https://res.cloudinary.com/...
INFO - Imagen eliminada exitosamente: cars/auto123
```

### **Cloudinary Analytics**
- Ve a "Analytics" en el dashboard
- Monitorea el uso de ancho de banda
- Revisa las transformaciones aplicadas

¡Listo para probar! 🚀
