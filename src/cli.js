import arg from 'arg';
import inquirer from 'inquirer';

import {
  CLI_OPTIONS,
  DEFAULT_TEMPLATE,
  DEFAULT_STYLES,
  QUESTIONS,
} from './constant';
import { validateNewProject, validateOptions } from './validator';

import { createNewProject } from './main';
import { logError, transformPropsToLowerCase } from './utils';

function extractOptions(args) {
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    new: args['--new'] || false,
    template: args['--template'] || undefined,
    projectName: args._[0],
    style: args['--style'] || undefined,
    runInstall: args['--install'] || false,
  };
}

function parseArgumentsIntoOptions(rawArgs) {
  try {
    const args = arg({ ...CLI_OPTIONS }, { argv: rawArgs.slice(2) });
    return extractOptions(args);
  } catch (error) {
    if (error.code === 'ARG_UNKNOWN_OPTION') {
      logError(error.message);
      process.exit();
    } else {
      throw error;
    }
  }
}

async function askForMissingOptions(options) {
  validateNewProject(options);
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || DEFAULT_TEMPLATE,
      style: options.style || DEFAULT_STYLES,
      projectName: options.projectName,
    };
  }
  const questions = [];
  if (!options.template) {
    questions.push({ ...QUESTIONS.template });
  }

  if (!options.style) {
    questions.push({ ...QUESTIONS.style });
  }

  if (!options.git) {
    questions.push({ ...QUESTIONS.git });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    style: options.style || answers.style,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await askForMissingOptions(options);
  options = transformPropsToLowerCase(options, ['style', 'template']);
  validateOptions(options);
  // console.log(options, '*********');
  await createNewProject(options);
}
