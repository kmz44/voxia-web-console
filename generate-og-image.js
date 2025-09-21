// Script para generar imagen Open Graph optimizada para VOXIA
// Ejecutar en navegador para descargar imagen

console.log('🎨 Generando imagen Open Graph para VOXIA...');

// Crear canvas
const canvas = document.createElement('canvas');
canvas.width = 1200;
canvas.height = 630;
const ctx = canvas.getContext('2d');

// Función para generar la imagen
function generateVoxiaOGImage() {
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fondo degradado azul
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e40af');
    gradient.addColorStop(0.5, '#3b82f6');
    gradient.addColorStop(1, '#1e40af');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Overlay sutil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Efectos de fondo - círculos decorativos
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(canvas.width - 100, canvas.height - 100, 120, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(canvas.width - 200, 150, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Logo área
    const logoSize = 120;
    const logoX = 80;
    const logoY = (canvas.height - logoSize) / 2;
    
    // Fondo blanco para logo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    
    // Rectángulo redondeado para logo
    const radius = 20;
    const x = logoX - 20;
    const y = logoY - 20;
    const width = logoSize + 40;
    const height = logoSize + 40;
    
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.fill();
    
    // Logo text
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VOXIA', logoX + logoSize/2, logoY + logoSize/2 - 10);
    
    // Icono de micrófono
    ctx.font = '36px Arial, sans-serif';
    ctx.fillText('🎤', logoX + logoSize/2, logoY + logoSize/2 + 30);
    
    // Título principal
    ctx.fillStyle = 'white';
    ctx.font = 'bold 72px Arial, sans-serif';
    ctx.textAlign = 'left';
    const titleX = logoX + logoSize + 60;
    ctx.fillText('VOXIA', titleX, logoY + 50);
    
    // Subtítulo
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.fillStyle = '#e0f2fe';
    ctx.fillText('Asistente de IA', titleX, logoY + 100);
    
    // Descripción
    ctx.font = '28px Arial, sans-serif';
    ctx.fillStyle = '#f0f9ff';
    ctx.fillText('Síntesis de Voz en Español', titleX, logoY + 140);
    
    // Powered by
    ctx.font = '24px Arial, sans-serif';
    ctx.fillStyle = '#bfdbfe';
    ctx.fillText('Powered by VOXIA AI', titleX, logoY + 175);
    
    // Características clave
    const features = ['🗣️ Conversaciones Naturales', '🎓 Estudio Interactivo', '🎵 Integración YouTube'];
    ctx.font = '20px Arial, sans-serif';
    ctx.fillStyle = '#e0f2fe';
    features.forEach((feature, index) => {
        ctx.fillText(feature, titleX, logoY + 210 + (index * 30));
    });
    
    // URL en la esquina
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.fillText('voxia.ai', canvas.width - 40, canvas.height - 40);
    
    console.log('✅ Imagen Open Graph generada');
    return canvas;
}

// Función para descargar la imagen
function downloadOGImage() {
    const canvas = generateVoxiaOGImage();
    
    // Crear link de descarga
    const link = document.createElement('a');
    link.download = 'voxia-og-image.png';
    link.href = canvas.toDataURL('image/png');
    
    // Agregar al DOM temporalmente y hacer click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('📥 Imagen voxia-og-image.png descargada');
    
    // También generar WebP si está soportado
    if (canvas.toDataURL('image/webp').indexOf('image/webp') === 5) {
        const webpLink = document.createElement('a');
        webpLink.download = 'voxia-og-image.webp';
        webpLink.href = canvas.toDataURL('image/webp', 0.9);
        document.body.appendChild(webpLink);
        webpLink.click();
        document.body.removeChild(webpLink);
        console.log('📥 Imagen voxia-og-image.webp descargada');
    }
}

// Ejecutar automáticamente
downloadOGImage();

console.log('🎯 Imagen Open Graph de VOXIA generada exitosamente!');
console.log('📊 Especificaciones:');
console.log('  - Tamaño: 1200x630px (ratio 1.91:1)');
console.log('  - Formato: PNG optimizado');
console.log('  - Compatible con Facebook, Twitter, LinkedIn');
console.log('  - Optimizado para Open Graph y Twitter Cards');
console.log('');
console.log('📝 Próximos pasos:');
console.log('1. Guardar la imagen descargada en public/');
console.log('2. Actualizar meta tags en index.html');
console.log('3. Testear con Facebook Debugger y Twitter Card Validator');
console.log('4. Verificar en Google Rich Results Test');
