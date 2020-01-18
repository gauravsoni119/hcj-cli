import fs from 'fs';
import path from 'path';
import ncp from 'ncp';
import execa from 'execa';
import { promisify } from 'util';
import chalk from 'chalk';
import { isDirectoryExist } from './utils';

const copy = promisify(ncp);
const mkDir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);

export async function createProjectDir(options) {
  const project = options.targetDirectory + '/' + options.projectName;
  const isExist = await isDirectoryExist(project);
  if (isExist) {
    console.error(
      `%s Project with '%s' name is already exists`,
      chalk.red.bold('Error'),
      chalk.blue.bold(options.projectName)
    );
    process.exit();
  }
  try {
    return await mkDir(project);
  } catch (err) {
    console.error('%s While creating project', chalk.red.bold('Error'));
    process.exit();
  }
}

export async function copyTemplateFiles(options) {
  await copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
  return _updatePackageJson(options);
}

export async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'));
  }
}

async function _updatePackageJson(options) {
  try {
    const filePath = path.resolve(options.targetDirectory, 'package.json');
    const packageFile = await readFile(filePath);
    console.log(JSON.parse(packageFile), '-------');
    return Promise.resolve();
  } catch (err) {
    console.log(err, 'while parsing package.json');
    return Promise.resolve();
  }
}
