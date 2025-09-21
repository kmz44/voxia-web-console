// Script para crear favicon VOXIA y reemplazar el existente
console.log('🔗 Generando favicon VOXIA...');

// Crear canvas para favicon
const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const ctx = canvas.getContext('2d');

// Dibujar favicon VOXIA
function createVoxiaFavicon() {
    // Limpiar canvas
    ctx.clearRect(0, 0, 32, 32);
    
    // Fondo azul VOXIA
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(0, 0, 32, 32);
    
    // Borde redondeado
    ctx.fillStyle = '#1e40af';
    ctx.beginPath();
    ctx.moveTo(4, 0);
    ctx.lineTo(28, 0);
    ctx.quadraticCurveTo(32, 0, 32, 4);
    ctx.lineTo(32, 28);
    ctx.quadraticCurveTo(32, 32, 28, 32);
    ctx.lineTo(4, 32);
    ctx.quadraticCurveTo(0, 32, 0, 28);
    ctx.lineTo(0, 4);
    ctx.quadraticCurveTo(0, 0, 4, 0);
    ctx.fill();
    
    // Letra V en blanco
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('V', 16, 13);
    
    // Punto de micrófono
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(16, 22, 3, 0, Math.PI * 2);
    ctx.fill();
    
    console.log('✅ Favicon VOXIA generado');
    return canvas;
}

// Función para descargar el favicon
function downloadFavicon() {
    const faviconCanvas = createVoxiaFavicon();
    
    // Crear link de descarga
    const link = document.createElement('a');
    link.download = 'favicon.ico';
    link.href = faviconCanvas.toDataURL('image/png');
    
    // Agregar al DOM y hacer click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('📥 favicon.ico descargado');
    console.log('📋 Guardar como: public/favicon.ico');
    
    return faviconCanvas.toDataURL('image/png');
}

// Función para actualizar favicon dinámicamente
function updateFaviconInPage() {
    const faviconCanvas = createVoxiaFavicon();
    const faviconDataURL = faviconCanvas.toDataURL('image/png');
    
    // Buscar favicon existente
    let faviconLink = document.querySelector('link[rel="icon"]') || 
                     document.querySelector('link[rel="shortcut icon"]');
    
    if (!faviconLink) {
        // Crear nuevo link de favicon
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.type = 'image/png';
        document.head.appendChild(faviconLink);
    }
    
    // Actualizar href con nueva imagen
    faviconLink.href = faviconDataURL;
    
    console.log('🔄 Favicon actualizado dinámicamente en la página');
    console.log('✨ Debería verse el favicon de VOXIA en la pestaña');
}

// Función para crear favicons de múltiples tamaños
function createMultipleFavicons() {
    const sizes = [16, 32, 48, 64, 180];
    const favicons = {};
    
    sizes.forEach(size => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Fondo azul
        ctx.fillStyle = '#1e40af';
        ctx.fillRect(0, 0, size, size);
        
        // Contenido proporcional al tamaño
        if (size >= 64) {
            // Versión detallada
            ctx.fillStyle = 'white';
            ctx.font = `bold ${size * 0.25}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillText('VOXIA', size/2, size/2 - size*0.1);
            
            ctx.font = `${size * 0.3}px Arial`;
            ctx.fillText('🎤', size/2, size/2 + size*0.2);
        } else if (size >= 32) {
            // Versión media
            ctx.fillStyle = 'white';
            ctx.font = `bold ${size * 0.4}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillText('V', size/2, size/2);
            
            ctx.fillStyle = '#60a5fa';
            ctx.beginPath();
            ctx.arc(size/2, size/2 + size*0.2, size*0.08, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Versión simple
            ctx.fillStyle = 'white';
            ctx.font = `bold ${size * 0.6}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillText('V', size/2, size/2 + size*0.1);
        }
        
        favicons[size] = canvas.toDataURL('image/png');
    });
    
    return favicons;
}

// Función para descargar todos los favicons
function downloadAllFavicons() {
    const favicons = createMultipleFavicons();
    
    Object.keys(favicons).forEach(size => {
        const link = document.createElement('a');
        
        if (size === '180') {
            link.download = 'apple-touch-icon.png';
        } else {
            link.download = `favicon-${size}x${size}.png`;
        }
        
        link.href = favicons[size];
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    console.log('📦 Todos los favicons descargados');
}

// Ejecutar automáticamente
console.log('🎯 Iniciando generación de favicon VOXIA...');

// Actualizar favicon inmediatamente en la página
updateFaviconInPage();

// Descargar favicon para guardar
downloadFavicon();

// También crear múltiples tamaños
downloadAllFavicons();

console.log(`
🎉 FAVICON VOXIA GENERADO EXITOSAMENTE!

📋 Archivos generados:
- favicon.ico (32x32)
- favicon-16x16.png
- favicon-32x32.png  
- favicon-48x48.png
- favicon-64x64.png
- apple-touch-icon.png (180x180)

📝 Próximos pasos:
1. Guardar favicon.ico en public/favicon.ico
2. Limpiar caché del navegador (Ctrl+F5)
3. ¡El favicon de VOXIA aparecerá en las pestañas!

✨ El favicon ya se actualizó dinámicamente en esta pestaña.
`);

// Mostrar en consola el estado actual
setTimeout(() => {
    const currentFavicon = document.querySelector('link[rel="icon"]');
    console.log('🔍 Favicon actual:', currentFavicon?.href || 'No encontrado');
}, 1000);
