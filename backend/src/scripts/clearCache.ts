import { cacheService } from '../src/services/cacheService';

cacheService.del('cards_*'); // Удаляет все кэши с префиксом cards_
console.log('Cache cleared');