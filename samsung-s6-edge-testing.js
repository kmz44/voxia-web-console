// Samsung S6 Edge Mobile Testing Verification Script
// Para usar en DevTools Console del navegador

console.log('🔍 INICIANDO VERIFICACIÓN SAMSUNG S6 EDGE OPTIMIZATIONS');

// Función para verificar CSS variables
function verificarVariablesCSS() {
    console.log('\n📱 VERIFICANDO VARIABLES CSS ULTRA-MÓVILES:');
    
    const root = document.documentElement;
    const style = getComputedStyle(root);
    
    const variables = [
        '--mobile-ultra-small-max-width',
        '--touch-target-ultra-small', 
        '--ultra-mobile-padding',
        '--ultra-mobile-gap',
        '--font-size-ultra-small-body',
        '--mobile-bottom-nav-height-small'
    ];
    
    variables.forEach(variable => {
        const value = style.getPropertyValue(variable).trim();
        console.log(`✅ ${variable}: ${value || 'NO DEFINIDA'}`);
    });
}

// Función para verificar media queries
function verificarMediaQueries() {
    console.log('\n📐 VERIFICANDO MEDIA QUERIES:');
    
    const queries = [
        '(max-width: 360px)',
        '(max-height: 400px) and (orientation: landscape)',
        '(max-height: 500px) and (orientation: landscape) and (max-width: 768px)'
    ];
    
    queries.forEach(query => {
        const matches = window.matchMedia(query).matches;
        console.log(`${matches ? '✅' : '❌'} ${query}: ${matches ? 'ACTIVA' : 'INACTIVA'}`);
    });
}

// Función para verificar elementos táctiles
function verificarElementosTactiles() {
    console.log('\n👆 VERIFICANDO ELEMENTOS TÁCTILES:');
    
    const buttons = document.querySelectorAll('button, .action-button, [role="button"]');
    let elementosValidos = 0;
    
    buttons.forEach((btn, index) => {
        const rect = btn.getBoundingClientRect();
        const minSize = Math.min(rect.width, rect.height);
        const esValido = minSize >= 44; // Mínimo recomendado
        
        if (esValido) elementosValidos++;
        
        if (index < 5) { // Mostrar solo los primeros 5
            console.log(`${esValido ? '✅' : '⚠️'} Botón ${index + 1}: ${minSize.toFixed(0)}px ${esValido ? '(OK)' : '(PEQUEÑO)'}`);
        }
    });
    
    console.log(`📊 Total: ${elementosValidos}/${buttons.length} botones con tamaño táctil adecuado`);
}

// Función para verificar layout responsive
function verificarLayout() {
    console.log('\n🎨 VERIFICANDO LAYOUT RESPONSIVE:');
    
    const elementos = {
        'main-content': document.querySelector('.main-content'),
        'control-area': document.querySelector('.control-area'), 
        'main-app-area': document.querySelector('.main-app-area'),
        'side-panel': document.querySelector('.side-panel')
    };
    
    for (const [nombre, elemento] of Object.entries(elementos)) {
        if (elemento) {
            const rect = elemento.getBoundingClientRect();
            const style = getComputedStyle(elemento);
            console.log(`✅ ${nombre}: ${rect.width.toFixed(0)}x${rect.height.toFixed(0)}px, padding: ${style.padding}`);
        } else {
            console.log(`❌ ${nombre}: NO ENCONTRADO`);
        }
    }
}

// Función para verificar tipografía
function verificarTipografia() {
    console.log('\n📝 VERIFICANDO TIPOGRAFÍA:');
    
    const elementos = [
        { selector: 'body', nombre: 'Body' },
        { selector: 'button', nombre: 'Botones' },
        { selector: 'h1, h2, h3', nombre: 'Encabezados' }
    ];
    
    elementos.forEach(({ selector, nombre }) => {
        const elemento = document.querySelector(selector);
        if (elemento) {
            const fontSize = getComputedStyle(elemento).fontSize;
            console.log(`✅ ${nombre}: ${fontSize}`);
        }
    });
}

// Función para simular Samsung S6 Edge
function simularSamsungS6Edge() {
    console.log('\n📱 SIMULANDO SAMSUNG S6 EDGE (360x640px):');
    
    // Cambiar viewport del navegador (solo informativo)
    console.log('💡 Para simular Samsung S6 Edge:');
    console.log('   1. Abrir DevTools (F12)');
    console.log('   2. Activar modo Device (Ctrl+Shift+M)');
    console.log('   3. Seleccionar "Responsive" o crear custom device');
    console.log('   4. Configurar: 360x640px, DPR: 2');
    console.log('   5. User Agent: Samsung Galaxy S6 Edge');
    
    // Verificar si el viewport actual es compatible
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (width <= 360) {
        console.log('✅ Viewport actual compatible con S6 Edge');
    } else {
        console.log(`⚠️ Viewport actual: ${width}x${height}px (mayor que S6 Edge)`);
    }
}

// Función para generar reporte completo
function generarReporte() {
    console.log('\n📋 GENERANDO REPORTE COMPLETO:');
    
    const reporte = {
        timestamp: new Date().toISOString(),
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio
        },
        userAgent: navigator.userAgent,
        cssVariables: {},
        mediaQueries: {},
        elementos: {
            buttons: document.querySelectorAll('button').length,
            inputs: document.querySelectorAll('input').length,
            panels: document.querySelectorAll('.side-panel').length
        }
    };
    
    console.log('📊 Reporte:', reporte);
    console.log('\n✅ VERIFICACIÓN COMPLETADA - Ver detalles arriba');
    
    return reporte;
}

// Ejecutar todas las verificaciones
async function ejecutarVerificacionCompleta() {
    try {
        verificarVariablesCSS();
        verificarMediaQueries();
        verificarElementosTactiles();
        verificarLayout();
        verificarTipografia();
        simularSamsungS6Edge();
        
        const reporte = generarReporte();
        
        console.log('\n🎉 ¡VERIFICACIÓN SAMSUNG S6 EDGE COMPLETADA!');
        console.log('💡 Consejo: Redimensiona la ventana a 360x640px para probar las optimizaciones');
        
        return reporte;
        
    } catch (error) {
        console.error('❌ Error durante la verificación:', error);
    }
}

// Auto-ejecutar la verificación
ejecutarVerificacionCompleta();

// Exportar funciones para uso manual
window.samsungS6EdgeTesting = {
    verificarVariablesCSS,
    verificarMediaQueries, 
    verificarElementosTactiles,
    verificarLayout,
    verificarTipografia,
    simularSamsungS6Edge,
    generarReporte,
    ejecutarVerificacionCompleta
};

console.log('\n🔧 Funciones disponibles en: window.samsungS6EdgeTesting');
