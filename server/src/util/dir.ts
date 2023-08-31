import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url).replace('/util', '');
const __dirname = dirname(__filename);

export { __filename, __dirname };