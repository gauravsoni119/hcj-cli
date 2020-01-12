import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';

import { TEMPLATE_OPTIONS, STYLE_OPTIONS } from './constant';
import { validateTemplate, validateStyle, validateNewProject } from './validator';

import { createNewProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '--new': Boolean,
            '--template': String,
            '--style': String,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install'
        },
        {
            argv: rawArgs.slice(2)
        }
    );

    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        new: args['--new'] || false,
        template: args['--template'] || undefined,
        projectName: args._[0],
        style: args['--style'] || undefined,
        runInstall: args['--install'] || false
    }
}

async function askForMissingOptions(options) {
    const defaultTemplate = 'JavaScript';
    const defaultCssPreprocessor = 'CSS';
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template ? validateTemplate(options.template) : defaultTemplate,
            style: options.style ? validateStyle(options.style) : defaultCssPreprocessor,
            projectName: validateNewProject(options) && options.projectName
        };
    }

    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: [...TEMPLATE_OPTIONS]
        });
    }

    if (!options.style) {
        questions.push({
            type: 'list',
            name: 'style',
            message: 'Please choose which CSS preprocessor to use',
            choices: [...STYLE_OPTIONS]
        });
    }

    if (!options.git) {
        questions.push({
            type: 'cofirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: false
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        style: options.style || answers.style,
        git: options.git || answers.git
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await askForMissingOptions(options);
    console.log(options);
    await createNewProject(options);
}