// 🔍 VERIFICACIÓN COMPLETA DE IMÁGENES OPEN GRAPH - VOXIA
// Ejecutar en consola del navegador para verificar que todo está correcto

console.log('🔍 VERIFICACIÓN DE IMÁGENES OPEN GRAPH - VOXIA');
console.log('==============================================\n');

// 1. Verificar meta tags de imagen
console.log('1. 🖼️ META TAGS DE IMAGEN:');

const ogImage = document.querySelector('meta[property="og:image"]');
const twitterImage = document.querySelector('meta[property="twitter:image"]');
const ogImageWidth = document.querySelector('meta[property="og:image:width"]');
const ogImageHeight = document.querySelector('meta[property="og:image:height"]');

console.log('Open Graph Image:', ogImage?.content || '❌ NO ENCONTRADO');
console.log('Twitter Image:', twitterImage?.content || '❌ NO ENCONTRADO');
console.log('OG Image Width:', ogImageWidth?.content || '❌ NO ENCONTRADO');
console.log('OG Image Height:', ogImageHeight?.content || '❌ NO ENCONTRADO');

// 2. Verificar que la imagen existe
console.log('\n2. 🌐 VERIFICACIÓN DE EXISTENCIA DE IMAGEN:');

const imageUrl = ogImage?.content;
if (imageUrl) {
    const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : window.location.origin + imageUrl.replace('%PUBLIC_URL%', '');
    
    console.log('URL completa de imagen:', fullImageUrl);
    
    // Intentar cargar la imagen
    const img = new Image();
    img.onload = function() {
        console.log('✅ Imagen cargada exitosamente');
        console.log(`📏 Dimensiones reales: ${this.naturalWidth}x${this.naturalHeight}px`);
        
        // Verificar si las dimensiones son correctas para Open Graph
        if (this.naturalWidth === 1200 && this.naturalHeight === 630) {
            console.log('✅ Dimensiones perfectas para Open Graph (1200x630)');
        } else if (this.naturalWidth / this.naturalHeight === 1.91) {
            console.log('✅ Ratio correcto para Open Graph (1.91:1)');
        } else {
            console.log('⚠️ Dimensiones no optimales para Open Graph');
            console.log('💡 Recomendado: 1200x630px (ratio 1.91:1)');
        }
    };
    
    img.onerror = function() {
        console.log('❌ Error al cargar la imagen');
        console.log('🔧 Verificar que el archivo existe en public/');
    };
    
    img.src = fullImageUrl;
} else {
    console.log('❌ No se encontró URL de imagen Open Graph');
}

// 3. Verificar Twitter Cards
console.log('\n3. 🐦 TWITTER CARDS:');
const twitterCard = document.querySelector('meta[property="twitter:card"]');
console.log('Twitter Card Type:', twitterCard?.content || '❌ NO ENCONTRADO');

if (twitterCard?.content === 'summary_large_image') {
    console.log('✅ Configurado para imagen grande (recomendado)');
} else {
    console.log('⚠️ Se recomienda "summary_large_image" para mejor visualización');
}

// 4. Verificar favicon
console.log('\n4. 🔗 FAVICON Y ICONOS:');
const favicon = document.querySelector('link[rel="icon"]');
const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');

console.log('Favicon:', favicon?.href || '❌ NO ENCONTRADO');
console.log('Apple Touch Icon:', appleTouchIcon?.href || '❌ NO ENCONTRADO');

// 5. Verificar manifest.json
console.log('\n5. 📱 PWA MANIFEST:');
const manifest = document.querySelector('link[rel="manifest"]');
console.log('Manifest:', manifest?.href || '❌ NO ENCONTRADO');

if (manifest) {
    fetch(manifest.href)
        .then(response => response.json())
        .then(manifestData => {
            console.log('✅ Manifest cargado exitosamente');
            console.log('App Name:', manifestData.name);
            console.log('Icons:', manifestData.icons?.length || 0, 'configurados');
            
            // Verificar iconos en manifest
            if (manifestData.icons && manifestData.icons.length > 0) {
                manifestData.icons.forEach((icon, index) => {
                    console.log(`  Icon ${index + 1}: ${icon.sizes} - ${icon.src}`);
                });
            }
        })
        .catch(error => {
            console.log('❌ Error cargando manifest:', error);
        });
}

// 6. Generar URLs de prueba
console.log('\n6. 🧪 URLs DE PRUEBA:');
const currentUrl = window.location.origin;
console.log('📝 URLs para testear:');
console.log(`🔗 Facebook Debugger: https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(currentUrl)}`);
console.log(`🔗 Twitter Card Validator: https://cards-dev.twitter.com/validator`);
console.log(`🔗 LinkedIn Inspector: https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(currentUrl)}`);
console.log(`🔗 Google Rich Results: https://search.google.com/test/rich-results?url=${encodeURIComponent(currentUrl)}`);

// 7. Resumen de verificación
console.log('\n7. 📊 RESUMEN DE VERIFICACIÓN:');

const checks = [
    { name: 'Open Graph Image', check: !!ogImage },
    { name: 'Twitter Image', check: !!twitterImage },
    { name: 'Image Dimensions', check: !!ogImageWidth && !!ogImageHeight },
    { name: 'Twitter Large Image', check: twitterCard?.content === 'summary_large_image' },
    { name: 'Favicon', check: !!favicon },
    { name: 'Apple Touch Icon', check: !!appleTouchIcon },
    { name: 'PWA Manifest', check: !!manifest }
];

const passed = checks.filter(check => check.check).length;
const total = checks.length;
const percentage = Math.round((passed / total) * 100);

console.log(`📈 Score: ${passed}/${total} verificaciones pasadas (${percentage}%)`);
console.log('');

checks.forEach(check => {
    console.log(`${check.check ? '✅' : '❌'} ${check.name}`);
});

// 8. Recomendaciones
console.log('\n8. 💡 RECOMENDACIONES:');

if (percentage === 100) {
    console.log('🎉 ¡Perfecto! Todas las verificaciones pasaron');
    console.log('🚀 VOXIA está completamente optimizado para redes sociales');
} else if (percentage >= 80) {
    console.log('👍 Muy bien! Solo faltan algunos detalles menores');
} else if (percentage >= 60) {
    console.log('⚠️ Necesita algunas mejoras para optimización completa');
} else {
    console.log('🔧 Requiere trabajo adicional en configuración de imágenes');
}

console.log('\n📝 Próximos pasos sugeridos:');
console.log('1. Testear en Facebook Debugger y Twitter Card Validator');
console.log('2. Verificar que la imagen se ve bien en diferentes tamaños');
console.log('3. Probar compartiendo en redes sociales reales');
console.log('4. Monitorear métricas de clicks desde redes sociales');

console.log('\n🎯 VERIFICACIÓN COMPLETA DE IMÁGENES VOXIA FINALIZADA');
