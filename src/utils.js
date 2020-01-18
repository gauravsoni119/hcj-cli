import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const stat = promisify(fs.stat);

export const logError = (message, title = 'Error') =>
  console.error(chalk.red.bold(title), message);

export const logInfo = (message, title = 'Info') =>
  console.info(chalk.blue.bold(title), message);

export const getTemplateDir = (url, dirName) =>
  path.resolve(url, '../../templates', dirName.toLowerCase());

export const isDirectoryExist = async dirPath => {
  let isExist;
  try {
    const dir = await stat(dirPath);
    isExist = dir.isDirectory();
  } catch (error) {
    isExist = false;
  }
  return isExist;
};

export const transformPropsToLowerCase = (obj, options) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    throw new Error('First argument should be object');
  }
  const newObj = {};
  for (const key in obj) {
    if (options.indexOf(key) > -1) {
      newObj[key] = obj[key].toLowerCase();
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
