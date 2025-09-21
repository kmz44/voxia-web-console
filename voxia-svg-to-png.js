// Crear imagen Open Graph optimizada para VOXIA usando SVG
const svgContent = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="30%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="70%" style="stop-color:#60a5fa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Fondo principal -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Overlay sutil -->
  <rect width="1200" height="630" fill="rgba(255,255,255,0.03)"/>
  
  <!-- Elementos decorativos -->
  <circle cx="120" cy="120" r="100" fill="rgba(255,255,255,0.08)"/>
  <circle cx="1080" cy="510" r="140" fill="rgba(255,255,255,0.08)"/>
  <circle cx="1000" cy="100" r="70" fill="rgba(255,255,255,0.08)"/>
  
  <!-- Área del logo -->
  <rect x="75" y="245" width="190" height="140" rx="25" ry="25" fill="rgba(255,255,255,0.97)"/>
  <rect x="77" y="247" width="186" height="136" rx="23" ry="23" fill="rgba(0,0,0,0.1)"/>
  
  <!-- Logo texto -->
  <text x="170" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#1e40af">VOXIA</text>
  <text x="170" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" fill="#3b82f6">🎤</text>
  
  <!-- Contenido principal -->
  <!-- Título principal -->
  <text x="340" y="285" font-family="Arial, sans-serif" font-size="84" font-weight="bold" fill="white">VOXIA</text>
  
  <!-- Subtítulo -->
  <text x="340" y="335" font-family="Arial, sans-serif" font-size="42" font-weight="bold" fill="#e0f2fe">Asistente de IA</text>
  
  <!-- Descripción -->
  <text x="340" y="370" font-family="Arial, sans-serif" font-size="32" fill="#f0f9ff">Síntesis de Voz en Español</text>
  
  <!-- Powered by -->
  <text x="340" y="405" font-family="Arial, sans-serif" font-size="26" fill="#bfdbfe">Powered by VOXIA AI</text>
  
  <!-- Características -->
  <text x="340" y="450" font-family="Arial, sans-serif" font-size="22" fill="#e0f2fe">🗣️ Conversaciones Naturales</text>
  <text x="340" y="482" font-family="Arial, sans-serif" font-size="22" fill="#e0f2fe">🎓 Estudio Interactivo</text>
  <text x="340" y="514" font-family="Arial, sans-serif" font-size="22" fill="#e0f2fe">🎵 Integración YouTube</text>
  
  <!-- URL -->
  <text x="1150" y="580" text-anchor="end" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white">voxia.ai</text>
</svg>
`;

// Convertir SVG a PNG usando canvas
function svgToPng() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    const svgBlob = new Blob([svgContent], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        
        // Descargar como PNG
        const link = document.createElement('a');
        link.download = 'voxia-og-image.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Imagen Open Graph VOXIA generada y descargada');
        console.log('📊 Especificaciones: 1200x630px, PNG optimizado');
        console.log('🎯 Listo para usar en meta tags Open Graph');
    };
    
    img.src = url;
}

// Ejecutar
svgToPng();
