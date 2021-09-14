const { readdirSync } = require('fs')
const path = require('path')

function getModuleList () {
  const modulePath = path.join(process.cwd(), 'src')
  return readdirSync(modulePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'core')
    .map(dirent => dirent.name)
}

const config = (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  plop.setGenerator('module', {
    description: 'Generate a new module contain resolver',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the module:'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}/{{name}}-resolver.ts',
        templateFile: 'templates/module/resolver.hbs'
      },
      {
        type: 'add',
        path: 'src/{{name}}/index.ts',
        templateFile: 'templates/module/export-resolver.hbs'
      },
      {
        type: 'append',
        path: 'src/core/index.ts',
        pattern: /import { [a-zA-Z]+Resolver } from '..\/[a-zA-z]+'/,
        templateFile: 'templates/core/import-resolver.hbs',
        separator: ''
      },
      {
        type: 'append',
        path: 'src/core/index.ts',
        pattern: /export const resolvers: NonEmptyArray<Function> = \[/,
        templateFile: 'templates/core/export-resolver.hbs'
      }
    ]
  })

  plop.setGenerator('model', {
    description: 'Generate a new model inside module',
    prompts: [
      {
        type: 'list',
        name: 'moduleName',
        message: 'Which module do you want to add this model',
        choices: getModuleList()
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the model'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{moduleName}}/{{name}}-model.ts',
        templateFile: 'templates/module/model.hbs'
      },
      {
        type: 'append',
        path: 'src/{{moduleName}}/index.ts',
        templateFile: 'templates/module/export-model.hbs',
        separator: ''
      }
    ]
  })
}

module.exports = config
