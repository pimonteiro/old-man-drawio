import * as tldraw from 'tldraw';
import fs from 'fs';
const keys = Object.keys(tldraw).filter(k => k.toLowerCase().includes('arrowkind') || k.toLowerCase().includes('arrowshapekind'));
fs.writeFileSync('/tmp/out2.txt', JSON.stringify(keys));
