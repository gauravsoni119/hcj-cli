import chalk from 'chalk';
import fs from 'fs';
import { promisify } from 'util';

import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import { getTemplateDir } from './utils';
import { createProjectDir, copyTemplateFiles, initGit } from './tasks';

const access = promisify(fs.access);

export async function createNewProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = __filename;
  const templateDir = getTemplateDir(
    currentFileUrl,
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error(
      '%s Invalid template name %s',
      chalk.red.bold('ERROR'),
      chalk.blue.bold(options.template)
    );
    process.exit();
  }

  const tasks = new Listr([
    {
      title: 'Creating Project',
      task: () => createProjectDir(options),
    },
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass --install to automatically install dependencies'
          : undefined,
    },
  ]);

  await tasks.run();

  console.log(
    '%s Project %s ready',
    chalk.green.bold('DONE'),
    chalk.blue.bold(options.projectName)
  );
  return true;
}
