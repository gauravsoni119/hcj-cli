export const CLI_OPTIONS = {
  '--git': Boolean,
  '--yes': Boolean,
  '--install': Boolean,
  '--new': Boolean,
  '--template': String,
  '--style': String,
  '-g': '--git',
  '-y': '--yes',
  '-i': '--install',
};
export const TEMPLATE_OPTIONS = {
  label: ['JavaScript', 'TypeScript'],
  value: ['javascript', 'typescript'],
};
export const STYLE_OPTIONS = {
  label: ['CSS', 'SCSS', 'SASS', 'LESS'],
  value: ['css', 'scss', 'sass', 'less'],
};

export const DEFAULT_TEMPLATE = 'JavaScript';
export const DEFAULT_STYLES = 'CSS';

export const QUESTIONS = {
  style: {
    type: 'list',
    name: 'style',
    message: 'Please choose which CSS preprocessor to use',
    choices: [...STYLE_OPTIONS.label],
  },
  template: {
    type: 'list',
    name: 'template',
    message: 'Please choose which project template to use',
    choices: [...TEMPLATE_OPTIONS.label],
  },
  git: {
    type: 'cofirm',
    name: 'git',
    message: 'Initialize a git repository?',
    default: false,
  },
};
