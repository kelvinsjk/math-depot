import * as fs from 'fs';
import * as path from 'path';

// Define the root folder as the current working directory
const rootFolder: string = process.cwd();

// Define a regular expression to match folder names of the form xxpyqzz
const folderNameRegex: RegExp = /^([0-9]{2})(p[1|2])(q[0-9]{2})$/;

// Recursively process folders
function processFolders(directory: string): void {
	const items: string[] = fs.readdirSync(directory);

	for (const item of items) {
		const itemPath: string = path.join(directory, item);
		const stats: fs.Stats = fs.statSync(itemPath);

		if (stats.isDirectory()) {
			const match: RegExpMatchArray | null = item.match(folderNameRegex);
			if (match) {
				const [, xx, py, qzz] = match;
				const newPath: string = path.join(directory, xx, py, qzz);
				fs.mkdirSync(newPath, { recursive: true }); // Create the new folder structure
				// Move the contents of itemPath to newPath, not the itemPath itself
				moveContents(itemPath, newPath);
			}
			processFolders(itemPath); // Recursively process subdirectories
		}
	}
}

function moveContents(source: string, destination: string): void {
	const items: string[] = fs.readdirSync(source);

	for (const item of items) {
		const sourcePath: string = path.join(source, item);
		const destPath: string = path.join(destination, item);
		fs.renameSync(sourcePath, destPath);
	}
}

processFolders(rootFolder);
