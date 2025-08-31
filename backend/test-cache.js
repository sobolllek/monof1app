const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testCache() {
  console.log('🧪 Testing cache system...\n');
  
  try {
    // 1. Тест базового кэширования
    console.log('1. Testing basic cache functionality:');
    const testResult = await axios.get(`${BASE_URL}/api/cache/test`);
    console.log('   Result:', testResult.data.message);
    
    // 2. Проверка статуса кэша
    console.log('\n2. Cache status:');
    const status = await axios.get(`${BASE_URL}/api/cache/status`);
    console.log('   Total keys:', status.data.totalKeys);
    console.log('   Image keys:', status.data.imageKeys);
    console.log('   Cache hits:', status.data.stats.hits);
    console.log('   Cache misses:', status.data.stats.misses);
    
    // 3. Тест API endpoints
    console.log('\n3. Testing cards API cache:');
    
    // Первый запрос (должен быть MISS)
    console.log('   First request:');
    const firstRequest = await axios.get(`${BASE_URL}/api/cards`);
    console.log('     X-Cache:', firstRequest.headers['x-cache']);
    console.log('     Time:', firstRequest.headers['date']);
    
    // Второй запрос (должен быть HIT)
    console.log('   Second request:');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const secondRequest = await axios.get(`${BASE_URL}/api/cards`);
    console.log('     X-Cache:', secondRequest.headers['x-cache']);
    console.log('     Time:', secondRequest.headers['date']);
    
    // 4. Проверка после повторного запроса
    console.log('\n4. Cache status after requests:');
    const finalStatus = await axios.get(`${BASE_URL}/api/cache/status`);
    console.log('   Total keys:', finalStatus.data.totalKeys);
    console.log('   Cache hits:', finalStatus.data.stats.hits);
    console.log('   Cache misses:', finalStatus.data.stats.misses);
    
    console.log('\n🎉 Cache test completed!');
    
  } catch (error) {
    console.error('❌ Error testing cache:', error.message);
  }
}

testCache();