import chalk from 'chalk';
import { logError } from './utils';
import { TEMPLATE_OPTIONS, STYLE_OPTIONS } from './constant';


export function validateTemplate(template) {
    if (TEMPLATE_OPTIONS.indexOf(template) === -1) {
        logError(`Invalid template name ${template}. Template should be any of ${ chalk.red(TEMPLATE_OPTIONS) }`);
        process.exit();
    }
}

export function validateStyle(style) {
    if (STYLE_OPTIONS.indexOf(style) === -1) {
        logError(`Invalid style options ${template}. Style should be any of ${STYLE_OPTIONS}`);
        process.exit();
    }
}

export function validateNewProject(options) {
    if (options.new && !options.projectName) {
        logError('Project name is required');
        process.exit();
    }
    return;
}