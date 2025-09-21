// Mobile Testing Complete - Samsung S6 Edge & All Mobile Devices
// Comprehensive verification script for all mobile optimizations
// Execute in DevTools Console after loading http://localhost:3000

console.log('🔍 INICIANDO VERIFICACIÓN COMPLETA DE OPTIMIZACIONES MÓVILES');
console.log('📱 Compatibilidad: Samsung S6 Edge (360x640px) y todos los dispositivos móviles');

// === VERIFICACIÓN DE ELEMENTOS OCULTOS EN MÓVIL ===
function verificarElementosOcultos() {
    console.log('\n🙈 VERIFICANDO ELEMENTOS OCULTOS EN MÓVIL:');
    
    const elementosOcultos = [
        { 
            selector: '.env-checker-container', 
            nombre: 'EnvChecker (Diagnósticos)',
            descripcion: 'Panel de diagnóstico de variables de entorno'
        },
        { 
            selector: '.hidden-mobile', 
            nombre: 'Elementos con clase hidden-mobile',
            descripcion: 'Cualquier elemento marcado para ocultar en móvil'
        },
        { 
            selector: '.debug-panel', 
            nombre: 'Paneles de debug',
            descripcion: 'Paneles de desarrollo y debug'
        }
    ];
    
    const isMobile = window.innerWidth <= 768;
    
    elementosOcultos.forEach(({ selector, nombre, descripcion }) => {
        const elementos = document.querySelectorAll(selector);
        
        if (elementos.length === 0) {
            console.log(`ℹ️ ${nombre}: No encontrado (normal si no está presente)`);
            return;
        }
        
        elementos.forEach((elemento, index) => {
            const style = getComputedStyle(elemento);
            const isHidden = style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
            
            if (isMobile) {
                console.log(`${isHidden ? '✅' : '⚠️'} ${nombre} ${index + 1}: ${isHidden ? 'OCULTO CORRECTAMENTE' : 'VISIBLE (debería estar oculto)'}`);
                if (!isHidden) {
                    console.log(`   📱 En móvil (${window.innerWidth}px) debería estar oculto`);
                    console.log(`   📋 ${descripcion}`);
                }
            } else {
                console.log(`ℹ️ ${nombre} ${index + 1}: VISIBLE (normal en desktop ${window.innerWidth}px)`);
            }
        });
    });
}

// === VERIFICACIÓN DE LAYOUT MOBILE-FIRST ===
function verificarLayoutMobileFirst() {
    console.log('\n📐 VERIFICANDO LAYOUT MOBILE-FIRST:');
    
    const elementos = {
        'mobile-chat-layout': {
            selector: '.mobile-chat-layout',
            requerido: true,
            descripcion: 'Layout principal estilo ChatGPT'
        },
        'mobile-header': {
            selector: '.mobile-header',
            requerido: true,
            descripcion: 'Header compacto fijo'
        },
        'conversation-area': {
            selector: '.conversation-area',
            requerido: true,
            descripcion: 'Área principal de conversación'
        },
        'mobile-controls-footer': {
            selector: '.mobile-controls-footer',
            requerido: true,
            descripcion: 'Footer de controles fijos'
        },
        'control-tray': {
            selector: '.control-tray',
            requerido: true,
            descripcion: 'Bandeja de controles'
        }
    };
    
    for (const [nombre, {selector, requerido, descripcion}] of Object.entries(elementos)) {
        const elemento = document.querySelector(selector);
        if (elemento) {
            const rect = elemento.getBoundingClientRect();
            const style = getComputedStyle(elemento);
            console.log(`✅ ${nombre}:`);
            console.log(`   📏 Tamaño: ${rect.width.toFixed(0)}x${rect.height.toFixed(0)}px`);
            console.log(`   📦 Padding: ${style.padding}`);
            console.log(`   📋 ${descripcion}`);
        } else if (requerido) {
            console.log(`❌ ${nombre}: NO ENCONTRADO (requerido para mobile-first)`);
        } else {
            console.log(`⚠️ ${nombre}: No encontrado (opcional)`);
        }
    }
}

// === VERIFICACIÓN DE TAMAÑOS DE BOTONES TÁCTILES ===
function verificarBotonesTactiles() {
    console.log('\n👆 VERIFICANDO BOTONES TÁCTILES OPTIMIZADOS:');
    
    const botones = document.querySelectorAll('button, .action-button, [role="button"]');
    let botonesTotales = botones.length;
    let botonesValidos = 0;
    let botonPrincipal = null;
    let botonesSecundarios = [];
    
    botones.forEach((btn, index) => {
        const rect = btn.getBoundingClientRect();
        const minSize = Math.min(rect.width, rect.height);
        const esValido = minSize >= 44; // Mínimo de accesibilidad
        const esPrincipal = minSize >= 64; // Botón principal
        const esSecundario = minSize >= 52 && minSize < 64; // Botones secundarios
        
        if (esValido) botonesValidos++;
        
        // Identificar tipos de botones
        if (esPrincipal) {
            botonPrincipal = { elemento: btn, tamaño: minSize };
        } else if (esSecundario) {
            botonesSecundarios.push({ elemento: btn, tamaño: minSize });
        }
        
        // Mostrar detalles de los primeros 5 botones
        if (index < 5) {
            let tipo = '';
            if (esPrincipal) tipo = ' (PRINCIPAL)';
            else if (esSecundario) tipo = ' (SECUNDARIO)';
            else if (esValido) tipo = ' (VÁLIDO)';
            else tipo = ' (PEQUEÑO)';
            
            console.log(`${esValido ? '✅' : '⚠️'} Botón ${index + 1}: ${minSize.toFixed(0)}px${tipo}`);
        }
    });
    
    console.log(`\n📊 RESUMEN DE BOTONES:`);
    console.log(`   Total: ${botonesTotales}`);
    console.log(`   Válidos (≥44px): ${botonesValidos}/${botonesTotales}`);
    console.log(`   Principales (≥64px): ${botonPrincipal ? 1 : 0}`);
    console.log(`   Secundarios (52-63px): ${botonesSecundarios.length}`);
    
    if (botonPrincipal) {
        console.log(`✅ Botón principal encontrado: ${botonPrincipal.tamaño.toFixed(0)}px`);
    } else {
        console.log(`⚠️ No se encontró botón principal (≥64px)`);
    }
}

// === VERIFICACIÓN DE MEDIA QUERIES SAMSUNG S6 EDGE ===
function verificarMediaQueriesSamsungS6Edge() {
    console.log('\n📱 VERIFICANDO MEDIA QUERIES SAMSUNG S6 EDGE:');
    
    const queries = [
        {
            query: '(max-width: 360px)',
            nombre: 'Samsung S6 Edge Width',
            descripcion: 'Optimizaciones para ancho de 360px'
        },
        {
            query: '(max-width: 375px)',
            nombre: 'iPhone SE Width',
            descripcion: 'Optimizaciones para iPhone SE y similares'
        },
        {
            query: '(max-width: 390px)',
            nombre: 'iPhone 14 Width',
            descripcion: 'Optimizaciones para iPhone 14 y similares'
        },
        {
            query: '(max-width: 480px)',
            nombre: 'Mobile General',
            descripcion: 'Optimizaciones generales móviles'
        },
        {
            query: '(max-width: 768px)',
            nombre: 'Tablet Portrait',
            descripcion: 'Optimizaciones para tablets verticales'
        },
        {
            query: '(max-height: 400px) and (orientation: landscape)',
            nombre: 'Landscape Ultra-compacto',
            descripcion: 'S6 Edge en landscape'
        },
        {
            query: '(max-height: 500px) and (orientation: landscape) and (max-width: 768px)',
            nombre: 'Mobile Landscape',
            descripcion: 'Móviles en landscape general'
        }
    ];
    
    queries.forEach(({ query, nombre, descripcion }) => {
        const matches = window.matchMedia(query).matches;
        console.log(`${matches ? '✅' : '❌'} ${nombre}:`);
        console.log(`   Query: ${query}`);
        console.log(`   Estado: ${matches ? 'ACTIVA' : 'INACTIVA'}`);
        console.log(`   Propósito: ${descripcion}`);
    });
}

// === VERIFICACIÓN DE VARIABLES CSS MOBILE ===
function verificarVariablesCSS() {
    console.log('\n🎨 VERIFICANDO VARIABLES CSS MOBILE:');
    
    const root = document.documentElement;
    const style = getComputedStyle(root);
    
    const variables = [
        // Variables mobile principales
        { name: '--mobile-bg', categoria: 'Colores' },
        { name: '--mobile-surface', categoria: 'Colores' },
        { name: '--mobile-text', categoria: 'Colores' },
        { name: '--mobile-accent', categoria: 'Colores' },
        
        // Layout mobile
        { name: '--mobile-header-height', categoria: 'Layout' },
        { name: '--mobile-footer-height', categoria: 'Layout' },
        { name: '--mobile-padding', categoria: 'Layout' },
        { name: '--mobile-gap', categoria: 'Layout' },
        
        // Touch targets
        { name: '--mobile-touch-target', categoria: 'Touch' },
        { name: '--touch-target-min', categoria: 'Touch' },
        
        // Control tray
        { name: '--control-primary-size', categoria: 'Controls' },
        { name: '--control-secondary-size', categoria: 'Controls' },
        { name: '--control-gap', categoria: 'Controls' },
        
        // Samsung S6 Edge específicas
        { name: '--ultra-mobile-padding', categoria: 'S6 Edge' },
        { name: '--ultra-mobile-gap', categoria: 'S6 Edge' },
        { name: '--mobile-bottom-nav-height-small', categoria: 'S6 Edge' }
    ];
    
    const categorias = {};
    
    variables.forEach(({ name, categoria }) => {
        if (!categorias[categoria]) categorias[categoria] = [];
        const value = style.getPropertyValue(name).trim();
        categorias[categoria].push({
            name,
            value: value || 'NO DEFINIDA'
        });
    });
    
    for (const [categoria, vars] of Object.entries(categorias)) {
        console.log(`\n🏷️ ${categoria}:`);
        vars.forEach(({ name, value }) => {
            const icono = value !== 'NO DEFINIDA' ? '✅' : '❌';
            console.log(`   ${icono} ${name}: ${value}`);
        });
    }
}

// === VERIFICACIÓN DE RESPONSIVIDAD ===
function verificarResponsividad() {
    console.log('\n📐 VERIFICANDO RESPONSIVIDAD ACTUAL:');
    
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
        orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
    };
    
    console.log(`📱 Viewport actual:`);
    console.log(`   Ancho: ${viewport.width}px`);
    console.log(`   Alto: ${viewport.height}px`);
    console.log(`   Orientación: ${viewport.orientation}`);
    console.log(`   DPR: ${viewport.devicePixelRatio}`);
    
    // Identificar tipo de dispositivo basado en el tamaño
    let tipoDispositivo = '';
    if (viewport.width <= 360) {
        tipoDispositivo = 'Samsung S6 Edge / Ultra-pequeño';
    } else if (viewport.width <= 375) {
        tipoDispositivo = 'iPhone SE / Pequeño';
    } else if (viewport.width <= 390) {
        tipoDispositivo = 'iPhone 14 / Medio';
    } else if (viewport.width <= 480) {
        tipoDispositivo = 'Móvil estándar';
    } else if (viewport.width <= 768) {
        tipoDispositivo = 'Tablet pequeña / Portrait';
    } else {
        tipoDispositivo = 'Desktop / Tablet grande';
    }
    
    console.log(`   Tipo: ${tipoDispositivo}`);
    
    // Verificar si está en modo Samsung S6 Edge
    if (viewport.width === 360 && viewport.height === 640) {
        console.log(`🎯 ¡PERFECTO! Modo Samsung S6 Edge detectado`);
    } else if (viewport.width <= 360) {
        console.log(`✅ Modo ultra-pequeño activo (optimizaciones S6 Edge aplicadas)`);
    }
    
    return viewport;
}

// === REPORTE COMPLETO ===
function generarReporteCompleto() {
    console.log('\n📋 GENERANDO REPORTE COMPLETO:');
    
    const viewport = verificarResponsividad();
    const timestamp = new Date().toISOString();
    
    const reporte = {
        timestamp,
        viewport,
        userAgent: navigator.userAgent,
        url: window.location.href,
        tests: {
            elementosOcultos: 'Ejecutado',
            layoutMobileFirst: 'Ejecutado',
            botonesTactiles: 'Ejecutado',
            mediaQueries: 'Ejecutado',
            variablesCSS: 'Ejecutado'
        }
    };
    
    console.log(`\n🎉 REPORTE COMPLETO:`);
    console.log(reporte);
    
    // Instrucciones adicionales
    console.log(`\n💡 INSTRUCCIONES PARA TESTING MANUAL:`);
    console.log(`   1. Para Samsung S6 Edge: Cambiar viewport a 360x640px`);
    console.log(`   2. Verificar que todos los elementos ocultos estén ocultos`);
    console.log(`   3. Probar interacciones táctiles en los botones`);
    console.log(`   4. Verificar scroll suave en área de conversación`);
    console.log(`   5. Probar orientación landscape (500px alto máx)`);
    
    return reporte;
}

// === EJECUTAR TODAS LAS VERIFICACIONES ===
async function ejecutarVerificacionCompleta() {
    try {
        console.log(`\n🚀 Ejecutando verificación completa...`);
        
        // Ejecutar todas las verificaciones
        verificarElementosOcultos();
        verificarLayoutMobileFirst();
        verificarBotonesTactiles();
        verificarMediaQueriesSamsungS6Edge();
        verificarVariablesCSS();
        
        // Generar reporte final
        const reporte = generarReporteCompleto();
        
        console.log(`\n🎉 ¡VERIFICACIÓN COMPLETA TERMINADA!`);
        console.log(`⏰ ${new Date().toLocaleTimeString()}`);
        
        return reporte;
        
    } catch (error) {
        console.error('❌ Error durante la verificación completa:', error);
        return null;
    }
}

// === AUTO-EJECUTAR ===
ejecutarVerificacionCompleta();

// === EXPORTAR FUNCIONES ===
window.mobileTestingComplete = {
    verificarElementosOcultos,
    verificarLayoutMobileFirst,
    verificarBotonesTactiles,
    verificarMediaQueriesSamsungS6Edge,
    verificarVariablesCSS,
    verificarResponsividad,
    generarReporteCompleto,
    ejecutarVerificacionCompleta
};

console.log('\n🔧 Funciones disponibles en: window.mobileTestingComplete');
console.log('📱 Para re-ejecutar: window.mobileTestingComplete.ejecutarVerificacionCompleta()');
