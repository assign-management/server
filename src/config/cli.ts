import { program } from 'commander';

program.option('--debug', '--debug');
program.allowUnknownOption().parse(process.argv);

export const options = program.opts();
