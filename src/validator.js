import chalk from 'chalk';
import { logError } from './utils';
import { TEMPLATE_OPTIONS, STYLE_OPTIONS } from './constant';

export function validateTemplate(template) {
  if (TEMPLATE_OPTIONS.value.indexOf(template) === -1) {
    logError(
      `Invalid template name ${template}. Template should be any of ${chalk.red(
        TEMPLATE_OPTIONS
      )}`
    );
    process.exit();
  }
  return true;
}

export function validateStyle(style) {
  if (STYLE_OPTIONS.value.indexOf(style) === -1) {
    logError(
      `Invalid style options ${style}. Style should be any of ${STYLE_OPTIONS}`
    );
    process.exit();
  }
  return true;
}

export function validateNewProject(options) {
  if (options.new && !options.projectName) {
    logError('Project name is required');
    process.exit();
  }
  return true;
}

export const validators = {
  style: [validateStyle],
  template: [validateTemplate],
};

export function validateOptions(options) {
  for (const option in options) {
    validators[option] &&
      validators[option].reduce((acc, validator) => {
        acc = validator(options[option]);
        return acc;
      }, false);
  }
  return true;
}
