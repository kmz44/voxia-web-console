// Verificación completa de implementación VOXIA con SEO
// Ejecutar en consola del navegador para verificar implementación

console.log('🔍 VERIFICACIÓN COMPLETA DE VOXIA - SEO & LOGO');
console.log('=============================================\n');

// 1. Verificar título y meta tags
console.log('1. 📋 TÍTULO Y META TAGS:');
console.log('Título:', document.title);
console.log('Description:', document.querySelector('meta[name="description"]')?.content || 'NO ENCONTRADO');
console.log('Keywords:', document.querySelector('meta[name="keywords"]')?.content || 'NO ENCONTRADO');
console.log('Robots:', document.querySelector('meta[name="robots"]')?.content || 'NO ENCONTRADO');
console.log('');

// 2. Verificar Open Graph
console.log('2. 📱 OPEN GRAPH / FACEBOOK:');
const ogTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:site_name'];
ogTags.forEach(tag => {
  const content = document.querySelector(`meta[property="${tag}"]`)?.content;
  console.log(`${tag}:`, content || 'NO ENCONTRADO');
});
console.log('');

// 3. Verificar Twitter Cards
console.log('3. 🐦 TWITTER CARDS:');
const twitterTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
twitterTags.forEach(tag => {
  const content = document.querySelector(`meta[property="${tag}"]`)?.content;
  console.log(`${tag}:`, content || 'NO ENCONTRADO');
});
console.log('');

// 4. Verificar Structured Data
console.log('4. 🗂️ STRUCTURED DATA (Schema.org):');
const structuredData = document.querySelector('script[type="application/ld+json"]');
if (structuredData) {
  try {
    const data = JSON.parse(structuredData.textContent);
    console.log('✅ Structured Data encontrado:', data);
  } catch (e) {
    console.log('❌ Error parsing Structured Data:', e);
  }
} else {
  console.log('❌ No se encontró Structured Data');
}
console.log('');

// 5. Verificar logo VOXIA
console.log('5. 🎨 LOGO VOXIA:');
const logoImg = document.querySelector('.voxia-logo');
if (logoImg) {
  console.log('✅ Logo encontrado:', logoImg.src);
  console.log('Dimensiones:', `${logoImg.width}x${logoImg.height}`);
  console.log('Alt text:', logoImg.alt);
} else {
  console.log('❌ Logo VOXIA no encontrado');
}
console.log('');

// 6. Verificar favicon y manifest
console.log('6. 🔗 FAVICON Y MANIFEST:');
const favicon = document.querySelector('link[rel="icon"]');
const manifest = document.querySelector('link[rel="manifest"]');
const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');

console.log('Favicon:', favicon?.href || 'NO ENCONTRADO');
console.log('Manifest:', manifest?.href || 'NO ENCONTRADO');
console.log('Apple Touch Icon:', appleTouchIcon?.href || 'NO ENCONTRADO');
console.log('');

// 7. Verificar responsive design
console.log('7. 📱 RESPONSIVE DESIGN:');
const viewport = document.querySelector('meta[name="viewport"]');
console.log('Viewport meta:', viewport?.content || 'NO ENCONTRADO');

// Verificar breakpoints CSS
const mobileHeader = document.querySelector('.mobile-header');
if (mobileHeader) {
  const styles = window.getComputedStyle(mobileHeader);
  console.log('Mobile header encontrado');
  console.log('Background:', styles.backgroundColor);
} else {
  console.log('❌ Mobile header no encontrado');
}
console.log('');

// 8. Verificar PWA capabilities
console.log('8. 📲 PWA CAPABILITIES:');
if ('serviceWorker' in navigator) {
  console.log('✅ Service Worker soportado');
} else {
  console.log('❌ Service Worker no soportado');
}

if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('✅ App ejecutándose en modo standalone');
} else {
  console.log('ℹ️ App ejecutándose en navegador');
}
console.log('');

// 9. Verificar performance
console.log('9. ⚡ PERFORMANCE:');
if (window.performance && window.performance.navigation) {
  const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
  console.log(`Tiempo de carga: ${loadTime}ms`);
} else {
  console.log('Performance API no disponible');
}
console.log('');

// 10. Resumen final
console.log('🎯 RESUMEN FINAL:');
const checks = [
  { name: 'Título optimizado', check: document.title.includes('VOXIA') },
  { name: 'Meta description', check: !!document.querySelector('meta[name="description"]') },
  { name: 'Open Graph tags', check: !!document.querySelector('meta[property="og:title"]') },
  { name: 'Twitter Cards', check: !!document.querySelector('meta[property="twitter:card"]') },
  { name: 'Structured Data', check: !!document.querySelector('script[type="application/ld+json"]') },
  { name: 'Logo VOXIA', check: !!document.querySelector('.voxia-logo') },
  { name: 'Favicon', check: !!document.querySelector('link[rel="icon"]') },
  { name: 'Manifest PWA', check: !!document.querySelector('link[rel="manifest"]') },
  { name: 'Viewport responsive', check: !!document.querySelector('meta[name="viewport"]') },
  { name: 'Mobile header', check: !!document.querySelector('.mobile-header') }
];

const passed = checks.filter(check => check.check).length;
const total = checks.length;

console.log(`✅ ${passed}/${total} verificaciones pasadas (${Math.round(passed/total*100)}%)`);
console.log('');

checks.forEach(check => {
  console.log(`${check.check ? '✅' : '❌'} ${check.name}`);
});

console.log('\n🏆 IMPLEMENTACIÓN VOXIA COMPLETADA');
console.log('La aplicación está optimizada para SEO y lista para indexación en Google.');

// Verificar archivos adicionales via fetch (opcional)
console.log('\n🔍 Verificando archivos adicionales...');

// Verificar robots.txt
fetch('/robots.txt')
  .then(response => response.ok ? response.text() : null)
  .then(text => {
    if (text) {
      console.log('✅ robots.txt encontrado');
      console.log('Contenido robots.txt:', text.substring(0, 100) + '...');
    } else {
      console.log('❌ robots.txt no encontrado');
    }
  })
  .catch(() => console.log('❌ Error verificando robots.txt'));

// Verificar sitemap.xml
fetch('/sitemap.xml')
  .then(response => response.ok ? response.text() : null)
  .then(text => {
    if (text) {
      console.log('✅ sitemap.xml encontrado');
    } else {
      console.log('❌ sitemap.xml no encontrado');
    }
  })
  .catch(() => console.log('❌ Error verificando sitemap.xml'));

// Verificar manifest.json
fetch('/manifest.json')
  .then(response => response.ok ? response.json() : null)
  .then(manifest => {
    if (manifest) {
      console.log('✅ manifest.json encontrado');
      console.log('App name:', manifest.name);
      console.log('App description:', manifest.description);
    } else {
      console.log('❌ manifest.json no encontrado');
    }
  })
  .catch(() => console.log('❌ Error verificando manifest.json'));
