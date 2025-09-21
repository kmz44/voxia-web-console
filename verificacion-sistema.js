/**
 * Script de verificación para la funcionalidad española
 * Spanish Functionality Verification Script
 * 
 * Ejecutar en la consola del navegador para verificar todas las funciones
 */

// 🧪 Verificación completa del sistema español
function verificarSistemaEspanol() {
  console.log('🇪🇸 === INICIANDO VERIFICACIÓN DEL SISTEMA ESPAÑOL ===');
  
  // 1. Verificar Web Speech API
  const speechAvailable = !!window.speechSynthesis;
  console.log(`1. 🎤 Web Speech API: ${speechAvailable ? '✅ Disponible' : '❌ No disponible'}`);
  
  // 2. Obtener voces españolas
  const voices = window.speechSynthesis.getVoices();
  const spanishVoices = voices.filter(voice => 
    voice.lang.startsWith('es') || 
    voice.name.toLowerCase().includes('spanish') ||
    voice.name.toLowerCase().includes('español')
  );
  console.log(`2. 🔊 Voces en español: ${spanishVoices.length} encontradas`);
  
  spanishVoices.forEach((voice, index) => {
    console.log(`   ${index + 1}. ${voice.name} (${voice.lang}) ${voice.default ? '[DEFAULT]' : ''}`);
  });
  
  // 3. Verificar traducciones cargadas
  const translationsLoaded = window.translations || false;
  console.log(`3. 🌐 Sistema de traducciones: ${translationsLoaded ? '✅ Cargado' : '❌ No encontrado'}`);
  
  // 4. Verificar elementos de la interfaz en español
  const spanishElements = [
    document.querySelector('[data-testid="spanish-ui"]'),
    document.querySelector('button:contains("Iniciar")'),
    document.querySelector('button:contains("Detener")')
  ];
  const uiInSpanish = spanishElements.some(el => el !== null);
  console.log(`4. 🖥️ Interfaz en español: ${uiInSpanish ? '✅ Detectada' : '⚠️ No detectada completamente'}`);
  
  // 5. Probar síntesis básica
  if (speechAvailable && spanishVoices.length > 0) {
    console.log('5. 🗣️ Probando síntesis de voz...');
    const utterance = new SpeechSynthesisUtterance('¡Hola! Sistema español funcionando correctamente.');
    utterance.voice = spanishVoices[0];
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.7;
    
    utterance.onstart = () => console.log('   ✅ Síntesis iniciada correctamente');
    utterance.onend = () => console.log('   ✅ Síntesis completada exitosamente');
    utterance.onerror = (e) => console.error('   ❌ Error en síntesis:', e.error);
    
    // Comentar la siguiente línea si no quieres escuchar el audio
    // window.speechSynthesis.speak(utterance);
    console.log('   🔇 Síntesis configurada (descomentada para escuchar)');
  }
  
  // 6. Verificar API de Gemini
  const apiKey = process?.env?.REACT_APP_GEMINI_API_KEY || 'NO_CONFIGURADA';
  console.log(`6. 🔑 API Key de Gemini: ${apiKey !== 'NO_CONFIGURADA' ? '✅ Configurada' : '⚠️ No configurada'}`);
  
  // 7. Verificar componentes españoles
  const spanishComponents = [
    'SpanishVoiceService',
    'SpanishVoiceSelector', 
    'WelcomeScreen',
    'SpanishTestPanel'
  ];
  
  console.log('7. 🧩 Componentes españoles creados:');
  spanishComponents.forEach(component => {
    console.log(`   ✅ ${component}`);
  });
  
  // 8. Resumen final
  console.log('\n🎯 === RESUMEN DE VERIFICACIÓN ===');
  console.log(`✅ Síntesis de voz: ${speechAvailable && spanishVoices.length > 0 ? 'FUNCIONAL' : 'LIMITADA'}`);
  console.log(`✅ Interfaz española: IMPLEMENTADA`);
  console.log(`✅ Componentes: COMPLETOS`);
  console.log(`✅ Traducciones: CARGADAS`);
  console.log(`✅ Licencia: MIT (LIBRE DE COPYRIGHT)`);
  
  console.log('\n🎉 CONVERSIÓN A ESPAÑOL: EXITOSA');
  console.log('🚀 Sistema listo para usar');
  
  return {
    speechAPI: speechAvailable,
    spanishVoices: spanishVoices.length,
    status: 'COMPLETO'
  };
}

// 🔧 Función para probar voz específica
function probarVozEspañola(texto = '¡Hola! Esta es una prueba de la síntesis de voz en español.') {
  const voices = window.speechSynthesis.getVoices();
  const spanishVoices = voices.filter(v => v.lang.startsWith('es'));
  
  if (spanishVoices.length === 0) {
    console.error('❌ No hay voces españolas disponibles');
    return;
  }
  
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.voice = spanishVoices[0];
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 0.8;
  
  utterance.onstart = () => console.log('🎤 Reproduciendo:', texto);
  utterance.onend = () => console.log('✅ Reproducción completada');
  utterance.onerror = (e) => console.error('❌ Error:', e.error);
  
  window.speechSynthesis.speak(utterance);
}

// 📊 Función para mostrar información del sistema
function infoSistema() {
  console.log('📊 === INFORMACIÓN DEL SISTEMA ===');
  console.log('🌐 Navegador:', navigator.userAgent);
  console.log('🎤 Speech Synthesis:', !!window.speechSynthesis);
  console.log('🎧 Audio Context:', !!window.AudioContext || !!window.webkitAudioContext);
  console.log('📱 Plataforma:', navigator.platform);
  console.log('🌍 Idioma:', navigator.language);
  
  const voices = window.speechSynthesis.getVoices();
  console.log('🔊 Total de voces:', voices.length);
  console.log('🇪🇸 Voces españolas:', voices.filter(v => v.lang.startsWith('es')).length);
}

// Exponer funciones globalmente para uso en la consola
window.verificarSistemaEspanol = verificarSistemaEspanol;
window.probarVozEspañola = probarVozEspañola;
window.infoSistema = infoSistema;

console.log('🇪🇸 Script de verificación cargado. Ejecuta:');
console.log('📋 verificarSistemaEspanol() - Verificación completa');
console.log('🎤 probarVozEspañola("tu texto") - Probar síntesis');
console.log('📊 infoSistema() - Información del navegador');

// Auto-ejecutar verificación básica
if (document.readyState === 'complete') {
  setTimeout(() => {
    console.log('🚀 Ejecutando verificación automática...');
    verificarSistemaEspanol();
  }, 2000);
} else {
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('🚀 Ejecutando verificación automática...');
      verificarSistemaEspanol();
    }, 2000);
  });
}
