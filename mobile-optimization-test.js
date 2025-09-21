/**
 * Script de Prueba para Optimizaciones Móviles - GeminiLive
 * Verifica que el panel de control esté oculto en móviles y que los botones sean flexibles
 */

console.log('🔧 Iniciando pruebas de optimización móvil...');

// Función para simular diferentes tamaños de pantalla
function simulateDevice(width, height, deviceName) {
  console.log(`📱 Simulando ${deviceName} (${width}x${height})`);
  
  // Cambiar el tamaño del viewport
  window.resizeTo(width, height);
  
  // Disparar evento de resize para actualizar React
  window.dispatchEvent(new Event('resize'));
  
  // Esperar un momento para que React procese los cambios
  return new Promise(resolve => setTimeout(resolve, 500));
}

// Función para verificar si el SidePanel está visible por defecto
function checkSidePanelVisibility() {
  const sidePanel = document.querySelector('.side-panel');
  const isMobileOverlay = sidePanel && sidePanel.classList.contains('mobile-overlay');
  const isVisible = sidePanel && window.getComputedStyle(sidePanel).display !== 'none';
  
  console.log('📋 Panel lateral:', {
    encontrado: !!sidePanel,
    esMobileOverlay: isMobileOverlay,
    visible: isVisible
  });
  
  return { sidePanel, isMobileOverlay, isVisible };
}

// Función para verificar el botón de ajustes en el header
function checkSettingsButton() {
  const settingsBtn = document.querySelector('.settings-btn');
  const isVisible = settingsBtn && window.getComputedStyle(settingsBtn).display !== 'none';
  
  console.log('⚙️ Botón de ajustes:', {
    encontrado: !!settingsBtn,
    visible: isVisible,
    texto: settingsBtn ? settingsBtn.textContent : 'N/A'
  });
  
  return { settingsBtn, isVisible };
}

// Función para verificar los botones del control tray
function checkControlTrayButtons() {
  const controlTray = document.querySelector('.control-tray');
  const actionsNav = document.querySelector('.actions-nav');
  const actionButtons = document.querySelectorAll('.action-button');
  const micButton = document.querySelector('.mic-button');
  const connectButton = document.querySelector('.connect-toggle');
  
  console.log('🎛️ Control Tray:', {
    controlTray: !!controlTray,
    actionsNav: !!actionsNav,
    totalBotones: actionButtons.length,
    botonMicrofono: !!micButton,
    botonConectar: !!connectButton
  });
  
  // Verificar tamaños de botones
  if (actionButtons.length > 0) {
    const buttonSizes = Array.from(actionButtons).map(btn => {
      const style = window.getComputedStyle(btn);
      return {
        width: style.width,
        height: style.height,
        minWidth: style.minWidth,
        minHeight: style.minHeight
      };
    });
    
    console.log('📏 Tamaños de botones:', buttonSizes);
  }
  
  return {
    controlTray,
    actionsNav,
    actionButtons,
    micButton,
    connectButton
  };
}

// Función para probar la funcionalidad del botón de ajustes
async function testSettingsButton() {
  const { settingsBtn } = checkSettingsButton();
  
  if (settingsBtn) {
    console.log('🔧 Probando botón de ajustes...');
    
    // Hacer clic en el botón
    settingsBtn.click();
    
    // Esperar que aparezca el panel
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Verificar si el panel aparece
    const { sidePanel, isVisible } = checkSidePanelVisibility();
    
    console.log('✅ Resultado del clic en ajustes:', {
      panelAparecio: isVisible,
      esMobileOverlay: sidePanel ? sidePanel.classList.contains('mobile-overlay') : false
    });
    
    // Buscar el botón de cerrar
    const closeBtn = document.querySelector('.mobile-close-btn');
    if (closeBtn) {
      console.log('❌ Botón de cerrar encontrado, probando...');
      closeBtn.click();
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const { isVisible: stillVisible } = checkSidePanelVisibility();
      console.log('✅ Panel cerrado correctamente:', !stillVisible);
    }
  }
}

// Función principal de prueba
async function runMobileOptimizationTest() {
  console.log('🚀 === PRUEBA DE OPTIMIZACIÓN MÓVIL ===');
  
  // Dispositivos de prueba
  const devices = [
    { name: 'Samsung S6 Edge', width: 360, height: 640 },
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone SE Horizontal', width: 667, height: 375 },
    { name: 'Google Pixel', width: 411, height: 731 },
    { name: 'Google Pixel Horizontal', width: 731, height: 411 },
    { name: 'Desktop', width: 1200, height: 800 }
  ];
  
  for (const device of devices) {
    console.log(`\n📱 === ${device.name} ===`);
    
    await simulateDevice(device.width, device.height, device.name);
    
    // Verificaciones básicas
    checkSidePanelVisibility();
    checkSettingsButton();
    checkControlTrayButtons();
    
    // Pruebas específicas para móviles
    if (device.width <= 768) {
      console.log('📱 Ejecutando pruebas específicas de móvil...');
      await testSettingsButton();
    }
    
    console.log('─'.repeat(50));
  }
  
  console.log('\n✅ === PRUEBAS COMPLETADAS ===');
  console.log('💡 Revisa los resultados en la consola para verificar que:');
  console.log('   1. El panel lateral esté oculto por defecto en móviles');
  console.log('   2. El botón de ajustes aparezca solo en móviles');
  console.log('   3. Los botones del control tray se adapten al tamaño');
  console.log('   4. El panel lateral se abra como overlay desde ajustes');
}

// Ejecutar pruebas automáticamente
runMobileOptimizationTest().catch(console.error);

// Función auxiliar para pruebas manuales
window.testMobileOptimizations = runMobileOptimizationTest;
window.simulateDevice = simulateDevice;

console.log('🔧 Script de pruebas cargado. Usa testMobileOptimizations() para ejecutar manualmente.');
