const fs = require('fs');
const path = require('path');
const dir = "c:/Users/navabro/Downloads/NAVABRO/src/components";

const files = fs.readdirSync(dir);
files.forEach(file => {
    if(!file.endsWith('.jsx')) return;
    const filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf-8');
    const original = content;
    
    // Clean up wrongly escaped backslashes from previous python replace
    content = content.replace(/\\'easeOut\\'/g, "'easeOut'");
    content = content.replace(/ease: 'easeOut',([^\}]+)ease: 'easeOut'/g, "ease: 'easeOut',$1");

    if (content !== original) {
        fs.writeFileSync(filepath, content);
        console.log('Fixed', file);
    }
});
console.log('Done');
