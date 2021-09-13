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

  plop.setGenerator('resolver', {
    description: 'Generate a graphql resolver of type-graphql',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the resolver:'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/resolvers/{{name}}-resolver.ts',
        templateFile: 'templates/resolver/resolver.hbs'
      },
      {
        type: 'append',
        path: 'src/resolvers/index.ts',
        templateFile: 'templates/resolver/import-resolver.hbs',
        pattern: /import [a-zA-Z]+Resolver from '.\/[a-zA-Z]+-resolver'/g,
        separator: ''
      },
      {
        type: 'append',
        path: 'src/resolvers/index.ts',
        templateFile: 'templates/resolver/export-resolver.hbs',
        pattern: /export default \[/
      }
    ]
  })
}

module.exports = config
