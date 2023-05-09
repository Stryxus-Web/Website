/*
    This script serves as a much more flexible solution for converting assets into better formats. Webpack support for the latest formats sure is slow...
*/
import {
    readFileSync,
    writeFileSync,
    unlinkSync,
    readdirSync,
    statSync,
    access,
    constants,
  } from 'fs';
import { sep, join, resolve } from 'path';

import sharp from 'sharp';
import ttf2woff2 from 'ttf2woff2';

function transcodePNGToAVIF(itempath) {
    try {
        const output = itempath.replace('.png', '.avif');
        sharp(readFileSync(itempath))
        .avif({ quality: 70, effort: 9 })
        .toBuffer()
        .then((data) => {
            writeFileSync(output, data);
            console.log(`Transcoded Image: ${sep}${itempath} > ${sep}${output}`);
        })
        .catch((err) => console.error(err));
    } catch (e) {
        console.error(`PNG To AVIF Trancoding Error: ${e}`);
    }
}

function getAllFiles(dirPath, arrayOfFiles) {
    let files = readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach((file) => {
        if (statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(join(dirPath, '/', file));
        }
    });
    return arrayOfFiles;
}

function fileExists(path) {
    try {
        access(path, constants.F_OK | constants.W_OK | constants.R_OK);
        return true;
    } catch {
        return false;
    }
}

(() => {
    console.log('Searching for files to optimize...');
    getAllFiles(join(resolve(), 'Client', 'wwwroot')).forEach((file) =>
    {
        if (!file.includes('wwwroot/webpack'))
        {
            if (file.endsWith('.png')) transcodePNGToAVIF(file);
            else if (file.endsWith('.ttf'))
            {
                try
                {
                    const output = file.replace('.ttf', '.woff2');
                    writeFileSync(output, ttf2woff2(readFileSync(file)));
                    console.log(`Transcoded Font: ${sep}${file} > ${sep}${output}`);
                } catch (e)
                {
                    console.error(`TTF To WOFF2 Trancoding Error: ${e}`);
                }
            }
        }
    });
})();
