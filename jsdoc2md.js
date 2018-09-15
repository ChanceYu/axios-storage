const fs = require('fs');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');

const tobeReplace = '#------------include------------#';

const templateFile = path.join(__dirname, 'template.md');
const outputFile = path.join(__dirname, 'README.md');

jsdoc2md.render({
    files: 'src/*.js',
    'no-cache': true
}).then((result) => {
    if(result){
        let data = fs.readFileSync(templateFile, 'utf-8');

        if(data){
            data = data.replace(tobeReplace, result);
        }
        fs.writeFile(outputFile, data, 'utf-8');
    }
});