module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Crear un componente React',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nombre del componente:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'plop-templates/Componente.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.css',
        template: '',
      },
    ],
  });
};
