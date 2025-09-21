// 🔍 VERIFICACIÓN COMPLETA DE FAVICON VOXIA
// Ejecutar en consola del navegador para verificar el favicon

console.log('🔍 VERIFICACIÓN DE FAVICON VOXIA');
console.log('================================\n');

// 1. Verificar links de favicon en el DOM
console.log('1. 🔗 LINKS DE FAVICON EN EL DOM:');

const faviconLinks = [
    { selector: 'link[rel="icon"]', name: 'Favicon principal' },
    { selector: 'link[rel="shortcut icon"]', name: 'Shortcut icon' },
    { selector: 'link[rel="apple-touch-icon"]', name: 'Apple touch icon' },
    { selector: 'link[rel="manifest"]', name: 'PWA Manifest' }
];

faviconLinks.forEach(linkInfo => {
    const link = document.querySelector(linkInfo.selector);
    if (link) {
        console.log(`✅ ${linkInfo.name}: ${link.href}`);
        console.log(`   Tipo: ${link.type || 'no especificado'}`);
        console.log(`   Tamaños: ${link.sizes || 'no especificado'}`);
    } else {
        console.log(`❌ ${linkInfo.name}: NO ENCONTRADO`);
    }
    console.log('');
});

// 2. Verificar que las imágenes existen
console.log('2. 🖼️ VERIFICACIÓN DE EXISTENCIA DE IMÁGENES:');

const iconLinks = document.querySelectorAll('link[rel*="icon"]');
iconLinks.forEach((link, index) => {
    const url = link.href;
    const img = new Image();
    
    img.onload = function() {
        console.log(`✅ Imagen ${index + 1} cargada: ${url}`);
        console.log(`   Dimensiones: ${this.naturalWidth}x${this.naturalHeight}px`);
        
        // Verificar si es adecuada para favicon
        if (this.naturalWidth >= 16 && this.naturalHeight >= 16) {
            console.log('   ✅ Tamaño adecuado para favicon');
        } else {
            console.log('   ⚠️ Puede ser muy pequeña para favicon');
        }
    };
    
    img.onerror = function() {
        console.log(`❌ Error cargando imagen ${index + 1}: ${url}`);
    };
    
    img.src = url;
});

// 3. Verificar favicon actual del navegador
console.log('\n3. 🌐 FAVICON ACTUAL DEL NAVEGADOR:');

const currentFavicon = document.querySelector('link[rel="icon"]') || 
                       document.querySelector('link[rel="shortcut icon"]');

if (currentFavicon) {
    console.log('Favicon activo:', currentFavicon.href);
    console.log('Tipo MIME:', currentFavicon.type || 'automático');
    
    // Intentar detectar si es el favicon por defecto
    if (currentFavicon.href.includes('voxia-logo.png')) {
        console.log('✅ Favicon personalizado de VOXIA detectado');
    } else if (currentFavicon.href.includes('favicon.ico')) {
        console.log('⚠️ Usando favicon.ico - puede ser el predeterminado');
    } else {
        console.log('ℹ️ Favicon personalizado detectado');
    }
} else {
    console.log('❌ No se encontró favicon en el DOM');
}

// 4. Forzar actualización del favicon
console.log('\n4. 🔄 ACTUALIZACIÓN FORZADA DEL FAVICON:');

function updateFavicon() {
    // Remover favicon existente
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(link => {
        if (link.rel === 'icon' || link.rel === 'shortcut icon') {
            link.remove();
        }
    });
    
    // Crear nuevo favicon con timestamp para evitar caché
    const newFavicon = document.createElement('link');
    newFavicon.rel = 'icon';
    newFavicon.type = 'image/png';
    newFavicon.href = `/voxia-logo.png?v=${Date.now()}`;
    
    document.head.appendChild(newFavicon);
    
    console.log('🔄 Favicon actualizado con nuevo timestamp');
    console.log('🆕 Nueva URL:', newFavicon.href);
    
    return newFavicon.href;
}

const newFaviconUrl = updateFavicon();

// 5. Verificar PWA manifest
console.log('\n5. 📱 VERIFICACIÓN PWA MANIFEST:');

const manifestLink = document.querySelector('link[rel="manifest"]');
if (manifestLink) {
    fetch(manifestLink.href)
        .then(response => response.json())
        .then(manifest => {
            console.log('✅ Manifest cargado exitosamente');
            console.log('Nombre de la app:', manifest.name);
            console.log('Iconos definidos:', manifest.icons?.length || 0);
            
            if (manifest.icons && manifest.icons.length > 0) {
                console.log('\nIconos en manifest:');
                manifest.icons.forEach((icon, index) => {
                    console.log(`  ${index + 1}. ${icon.sizes} - ${icon.src}`);
                });
            }
        })
        .catch(error => {
            console.log('❌ Error cargando manifest:', error);
        });
} else {
    console.log('❌ No se encontró link al manifest');
}

// 6. Pruebas de compatibilidad
console.log('\n6. 🔧 PRUEBAS DE COMPATIBILIDAD:');

const userAgent = navigator.userAgent;
console.log('Navegador:', userAgent);

// Detectar navegador
if (userAgent.includes('Chrome')) {
    console.log('✅ Chrome detectado - Soporte completo para PNG favicon');
} else if (userAgent.includes('Firefox')) {
    console.log('✅ Firefox detectado - Soporte completo para PNG favicon');
} else if (userAgent.includes('Safari')) {
    console.log('⚠️ Safari detectado - Puede preferir ICO, verificar resultado');
} else if (userAgent.includes('Edge')) {
    console.log('✅ Edge detectado - Soporte completo para PNG favicon');
} else {
    console.log('ℹ️ Navegador no identificado - Soporte puede variar');
}

// 7. Instrucciones para el usuario
console.log('\n7. 📋 INSTRUCCIONES PARA VER EL FAVICON:');

console.log(`
🔍 Si no ves el favicon de VOXIA:

1. 🔄 LIMPIAR CACHÉ:
   - Chrome/Edge: Ctrl + Shift + R
   - Firefox: Ctrl + F5
   - Safari: Cmd + Option + R

2. 🗂️ VERIFICAR ARCHIVOS:
   - Asegurar que voxia-logo.png existe en public/
   - Verificar permisos de archivo

3. 🚪 CERRAR Y REABRIR:
   - Cerrar pestaña completamente
   - Abrir nueva pestaña con la URL

4. 💾 LIMPIAR CACHÉ COMPLETO:
   - Chrome: Configuración > Privacidad > Borrar datos
   - Firefox: Configuración > Privacidad > Limpiar datos

5. 🔗 VERIFICAR EN MARCADORES:
   - Agregar página a marcadores
   - El favicon debería aparecer allí
`);

// 8. Resumen final
console.log('\n8. 📊 RESUMEN DE VERIFICACIÓN:');

setTimeout(() => {
    const finalChecks = [
        { name: 'Favicon link presente', check: !!document.querySelector('link[rel="icon"]') },
        { name: 'Manifest presente', check: !!document.querySelector('link[rel="manifest"]') },
        { name: 'Apple touch icon presente', check: !!document.querySelector('link[rel="apple-touch-icon"]') },
        { name: 'URL contiene voxia-logo', check: document.querySelector('link[rel="icon"]')?.href.includes('voxia-logo') }
    ];
    
    const passed = finalChecks.filter(check => check.check).length;
    const total = finalChecks.length;
    const percentage = Math.round((passed / total) * 100);
    
    console.log(`📈 Score: ${passed}/${total} verificaciones pasadas (${percentage}%)`);
    console.log('');
    
    finalChecks.forEach(check => {
        console.log(`${check.check ? '✅' : '❌'} ${check.name}`);
    });
    
    if (percentage === 100) {
        console.log('\n🎉 ¡Perfecto! El favicon de VOXIA está correctamente configurado');
        console.log('🏷️ Debería aparecer en las pestañas del navegador');
    } else if (percentage >= 75) {
        console.log('\n👍 Bien configurado, solo faltan detalles menores');
    } else {
        console.log('\n🔧 Necesita configuración adicional');
    }
    
    console.log('\n🎯 VERIFICACIÓN DE FAVICON VOXIA COMPLETADA');
    
}, 2000);

// Mostrar URL del favicon actualizado inmediatamente
console.log(`\n🆕 Favicon actualizado: ${newFaviconUrl}`);
console.log('⏱️ Puede tomar unos segundos en aparecer en la pestaña...');
