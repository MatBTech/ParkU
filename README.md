# Sistema de Gestión de Parqueadero Universitario

Sistema web para gestionar el parqueadero de una universidad, con control de entrada/salida de vehículos, gestión de conductores, administración de celdas y estadísticas.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** o **pnpm** (viene incluido con Node.js)
- **Visual Studio Code** - [Descargar aquí](https://code.visualstudio.com/)

### Verificar instalación de Node.js

Abre una terminal y ejecuta:

```bash
node --version
npm --version
```

Deberías ver las versiones instaladas (ej: v18.x.x o superior).

---

## 🚀 Paso a Paso para Ejecutar el Proyecto

### 1. Descargar el Proyecto

Primero, necesitas tener todos los archivos del proyecto en tu computadora. Si lo descargaste como ZIP, descomprímelo en una carpeta de tu preferencia.

### 2. Abrir el Proyecto en VSCode

1. Abre **Visual Studio Code**
2. Ve al menú: `Archivo` → `Abrir Carpeta...` (o `File` → `Open Folder...`)
3. Selecciona la carpeta donde están los archivos del proyecto
4. Haz clic en **Seleccionar carpeta** (o **Select Folder**)

### 3. Abrir la Terminal en VSCode

Dentro de VSCode:
- Ve al menú: `Terminal` → `Nueva Terminal` (o presiona `` Ctrl + ` ``)
- Esto abrirá una terminal en la parte inferior de VSCode

### 4. Instalar las Dependencias

En la terminal que acabas de abrir, ejecuta:

**Si usas npm:**
```bash
npm install
```

**Si usas pnpm (recomendado para este proyecto):**
```bash
pnpm install
```

**Si no tienes pnpm instalado, primero instálalo:**
```bash
npm install -g pnpm
pnpm install
```

Este proceso puede tardar unos minutos. Espera a que termine completamente.

### 5. Ejecutar el Proyecto

Una vez que las dependencias estén instaladas, ejecuta:

**Con npm:**
```bash
npm run dev
```

**Con pnpm:**
```bash
pnpm dev
```

### 6. Abrir en el Navegador

1. Verás un mensaje en la terminal similar a:
   ```
   VITE v6.x.x  ready in xxx ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

2. **Opción 1:** Mantén presionada la tecla `Ctrl` (o `Cmd` en Mac) y haz clic en el enlace `http://localhost:5173/`

3. **Opción 2:** Abre tu navegador web y escribe en la barra de direcciones:
   ```
   http://localhost:5173
   ```

### 7. ¡Listo! 🎉

La aplicación debería abrirse en tu navegador mostrando la pantalla de inicio de sesión.

---

## 👤 Credenciales de Acceso

Usa estas credenciales para probar el sistema:

### Administrador (acceso completo)
- **Email:** `admin@universidad.edu`
- **Contraseña:** `admin123`

### Usuario Regular (acceso limitado)
- **Email:** `usuario@universidad.edu`
- **Contraseña:** `user123`

---

## 🛠️ Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` o `pnpm dev` | Inicia el servidor de desarrollo |
| `npm run build` o `pnpm build` | Crea una versión optimizada para producción |
| `Ctrl + C` en la terminal | Detiene el servidor de desarrollo |

---

## 📱 Funcionalidades del Sistema

### Para Administradores:
- ✅ Dashboard con estadísticas generales
- ✅ Gestión completa de conductores (crear, editar, eliminar, cambiar estado)
- ✅ Gestión completa de vehículos (crear, editar, eliminar)
- ✅ Administración de celdas del parqueadero
- ✅ Asignación de vehículos a celdas
- ✅ Visualización de estados de celdas (disponible, ocupada, reservada)
- ✅ Perfil personalizable

### Para Usuarios Regulares:
- ✅ Dashboard con estadísticas
- ✅ Visualización de celdas del parqueadero
- ✅ Perfil personalizable

---

## 🎨 Características del Diseño

- 🟢 Diseño limpio y minimalista en colores blanco y verde
- 📱 Completamente responsive (funciona en móvil, tablet y desktop)
- 🌙 Interfaz intuitiva y fácil de usar
- ⚡ Navegación rápida entre secciones

---

## ❓ Solución de Problemas

### El comando `npm` o `pnpm` no se reconoce

**Solución:** Necesitas instalar Node.js desde [nodejs.org](https://nodejs.org/)

### Error: "Puerto 5173 ya está en uso"

**Solución:** 
1. Cierra otras aplicaciones que puedan estar usando ese puerto
2. O presiona `Ctrl + C` en la terminal y vuelve a ejecutar `npm run dev`

### Los cambios no se reflejan en el navegador

**Solución:** 
1. Guarda los archivos en VSCode (`Ctrl + S`)
2. Recarga la página del navegador (`F5` o `Ctrl + R`)

### Error al instalar dependencias

**Solución:**
1. Elimina la carpeta `node_modules` si existe
2. Elimina el archivo `package-lock.json` o `pnpm-lock.yaml` si existe
3. Ejecuta nuevamente `npm install` o `pnpm install`

---

## 📞 Soporte

Si tienes problemas para ejecutar el proyecto, verifica:

1. ✅ Que Node.js esté instalado correctamente
2. ✅ Que estés en la carpeta correcta del proyecto en la terminal
3. ✅ Que todas las dependencias se hayan instalado sin errores
4. ✅ Que no haya otro proceso usando el puerto 5173

---

## 📄 Licencia

Este proyecto es de uso educativo para la gestión de parqueaderos universitarios.

---

**¡Disfruta gestionando tu parqueadero universitario! 🚗🎓**
