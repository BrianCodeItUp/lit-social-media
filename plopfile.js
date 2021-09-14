const config = (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  plop.setHelper('toUpper', (value) => {
    if (typeof value === 'string') {
      return value.toUpperCase()
    }
    return value
  })
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
        templateFile: 'templates/module/index.hbs'
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
        pattern: /export const resolvers = \[/,
        templateFile: 'templates/core/export-resolver.hbs'
      }
    ]
  })
}

module.exports = config
