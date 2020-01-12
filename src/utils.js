import chalk from "chalk";
import path from 'path';

export const logError = (message, title = 'Error') => console.error(chalk.red.bold(title), message);
export const logInfo = (message, title = 'Info') => console.info(chalk.blue.bold(title), message);
export const getTemplateDir = (url, dirName) => path.resolve(new URL(url).pathname,'../../templates', dirName.toLowerCase());