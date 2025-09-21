// Browser-based Mobile Optimization Testing Script
// Run this in the browser console to test mobile features

(function() {
    console.log('🔧 Iniciando pruebas de optimización móvil en el navegador...');
    
    // Test function to simulate different device viewports
    function testDeviceViewport(deviceName, width, height) {
        console.log(`\n📱 === ${deviceName} ===`);
        console.log(`📱 Simulando ${deviceName} (${width}x${height})`);
        
        // Change viewport size
        if (window.chrome && window.chrome.debugger) {
            // DevTools API (if available)
            console.log('⚙️ Usando Chrome DevTools API para cambiar viewport');
        } else {
            // Manual viewport change
            console.log('⚙️ Simular viewport manualmente en DevTools');
            console.log(`   Tamaño recomendado: ${width}x${height}`);
        }
        
        // Test mobile detection
        const isMobile = window.innerWidth <= 768;
        console.log(`📱 Detección móvil: ${isMobile ? 'SÍ' : 'NO'} (ancho: ${window.innerWidth}px)`);
        
        // Test control tray visibility
        const controlTray = document.querySelector('.control-tray');
        if (controlTray) {
            const computedStyle = window.getComputedStyle(controlTray);
            console.log(`🎛️ Control Tray visible: ${computedStyle.display !== 'none'}`);
            console.log(`🎛️ Control Tray position: ${computedStyle.position}`);
        }
        
        // Test side panel
        const sidePanel = document.querySelector('.side-panel');
        if (sidePanel) {
            const computedStyle = window.getComputedStyle(sidePanel);
            console.log(`📋 Side Panel visible: ${computedStyle.display !== 'none'}`);
            if (isMobile) {
                console.log(`📋 Side Panel en móvil - debe estar oculto por defecto`);
            }
        }
        
        // Test settings button
        const settingsButton = document.querySelector('.settings-button, [title="Settings"], button[aria-label*="settings"]');
        if (settingsButton) {
            const computedStyle = window.getComputedStyle(settingsButton);
            console.log(`⚙️ Botón Settings visible: ${computedStyle.display !== 'none'}`);
        }
        
        // Test YouTube player
        const youtubePlayer = document.querySelector('.youtube-player, .youtube-container');
        if (youtubePlayer) {
            const computedStyle = window.getComputedStyle(youtubePlayer);
            console.log(`📺 YouTube Player visible: ${computedStyle.display !== 'none'}`);
            if (isMobile) {
                console.log(`📺 YouTube Player en móvil - debe estar centrado y minimizado`);
                console.log(`📺 Transform: ${computedStyle.transform}`);
            }
        }
        
        // Test hidden mobile elements
        const hiddenMobileElements = document.querySelectorAll('.hidden-mobile');
        console.log(`🚫 Elementos ocultos en móvil: ${hiddenMobileElements.length}`);
        hiddenMobileElements.forEach((element, index) => {
            const computedStyle = window.getComputedStyle(element);
            const isHidden = computedStyle.display === 'none' && isMobile;
            console.log(`   ${index + 1}. ${element.tagName} - Oculto en móvil: ${isHidden}`);
        });
        
        // Test touch targets (minimum 48px)
        const buttons = document.querySelectorAll('button');
        let touchTargetsPassed = 0;
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            const minSize = Math.min(rect.width, rect.height);
            if (minSize >= 48) touchTargetsPassed++;
        });
        console.log(`👆 Touch targets >= 48px: ${touchTargetsPassed}/${buttons.length} botones`);
        
        return {
            deviceName,
            width,
            height,
            isMobile,
            controlTrayVisible: !!controlTray,
            sidePanelVisible: !!sidePanel,
            youtubePlayerVisible: !!youtubePlayer,
            hiddenMobileElements: hiddenMobileElements.length,
            touchTargetsPassed: touchTargetsPassed,
            totalButtons: buttons.length
        };
    }
    
    // Test responsive breakpoints
    function testResponsiveBreakpoints() {
        console.log('\n🎯 === PRUEBA DE BREAKPOINTS RESPONSIVOS ===');
        
        const breakpoints = [
            { name: 'Desktop', width: 1200 },
            { name: 'Tablet', width: 768 },
            { name: 'Mobile', width: 480 },
            { name: 'iPhone 14', width: 390 },
            { name: 'iPhone SE', width: 375 },
            { name: 'Samsung S6 Edge', width: 360 },
            { name: 'Small Mobile', width: 320 }
        ];
        
        breakpoints.forEach(bp => {
            console.log(`\n📏 Breakpoint ${bp.name} (${bp.width}px):`);
            const isMobile = bp.width <= 768;
            console.log(`   📱 Es móvil: ${isMobile}`);
            console.log(`   📐 CSS aplicado: @media (max-width: ${bp.width}px)`);
        });
    }
    
    // Main test function
    function runMobileTests() {
        console.clear();
        console.log('🚀 === PRUEBA DE OPTIMIZACIÓN MÓVIL ===');
        console.log('Ejecutándose en:', navigator.userAgent);
        console.log('Viewport actual:', `${window.innerWidth}x${window.innerHeight}`);
        
        // Test current viewport
        const currentResults = testDeviceViewport('Viewport Actual', window.innerWidth, window.innerHeight);
        
        // Test responsive breakpoints
        testResponsiveBreakpoints();
        
        // Test touch events
        console.log('\n👆 === PRUEBA DE EVENTOS TÁCTILES ===');
        const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        console.log(`👆 Soporte táctil: ${touchSupported ? 'SÍ' : 'NO'}`);
        
        // Performance test
        console.log('\n⚡ === PRUEBA DE RENDIMIENTO ===');
        const startTime = performance.now();
        
        // Simulate heavy interaction
        setTimeout(() => {
            const endTime = performance.now();
            console.log(`⚡ Tiempo de respuesta: ${(endTime - startTime).toFixed(2)}ms`);
        }, 100);
        
        // Summary
        console.log('\n✅ === RESUMEN DE PRUEBAS ===');
        console.log('Para completar las pruebas:');
        console.log('1. Abre DevTools (F12)');
        console.log('2. Activa el modo responsive (Ctrl+Shift+M)');
        console.log('3. Prueba estos dispositivos:');
        console.log('   - Samsung S6 Edge (360x640)');
        console.log('   - iPhone SE (375x667)');
        console.log('   - iPhone 14 (390x844)');
        console.log('   - Pixel 5 (393x851)');
        console.log('4. Verifica que:');
        console.log('   ✓ SidePanel esté oculto por defecto');
        console.log('   ✓ Botón Settings sea accesible');
        console.log('   ✓ YouTube Player esté centrado');
        console.log('   ✓ Control Tray sea responsive');
        console.log('   ✓ Elementos .hidden-mobile estén ocultos');
        
        return currentResults;
    }
    
    // Make functions available globally
    window.testMobileOptimizations = runMobileTests;
    window.testDeviceViewport = testDeviceViewport;
    window.testResponsiveBreakpoints = testResponsiveBreakpoints;
    
    // Auto-run the tests
    runMobileTests();
    
    console.log('\n🎮 === COMANDOS DISPONIBLES ===');
    console.log('testMobileOptimizations() - Ejecutar todas las pruebas');
    console.log('testDeviceViewport("Device", width, height) - Probar dispositivo específico');
    console.log('testResponsiveBreakpoints() - Probar breakpoints');
})();
