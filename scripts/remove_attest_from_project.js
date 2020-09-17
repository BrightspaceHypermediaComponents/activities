import { readFileSync, writeFileSync } from 'fs';
//read in the package file
const file_contents = JSON.parse(readFileSync('package.json'));
if ('dependencies' in file_contents) {
	if ('attest' in file_contents.dependencies) {
		delete file_contents.dependencies.attest;
	}
}
writeFileSync('package.json', JSON.stringify(file_contents, null, '\t'));
