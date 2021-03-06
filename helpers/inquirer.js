const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            { value: 1, name: `${'1.'.green} Buscar ciudad.` },
            { value: 2, name: `${'2.'.green} Historial.` },
            { value: 0, name: `${'3.'.green} Salir.` },
        ]
    }
];

const inquirerMenu = async () => {

    console.clear();
    console.log('========================'.green);
    console.log(' Seleccione una opcion '.white);
    console.log('========================\n'.green);

    const { opcion } = await inquirer.prompt( preguntas );

    return opcion;
};

const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc', // Simepre se hara referencia con este nombre, 'desc'.
            message,
            validate( value ){
                if (value.length === 0) {
                    return 'Por favor ingrese un valor.';
                }
                return true;
            }
        }
    ];

    // Referencia al name: 'desc'.
    const { desc } = await inquirer.prompt( question );

    return desc;
};

const pausa = async () => {

    const preguntaPausa = [{
        type: 'input',
        name: 'pausa',
        message: `Presione ${ 'ENTER'.green } para continuar.`, 
    }];

    console.log('\n');
    await inquirer.prompt( preguntaPausa );
};

const listarLugares = async ( lugares = [] ) => {
    // { value: '1', name: `${'1.'.green} Crear una tarea` },

    const choices = lugares
        .map( (lugar, i)  => {
            const idx = (i + 1).toString().green;
            return {
                value: lugar.id,
                name: `${ idx }. ${ lugar.nombre }`
            };
        });

    choices.unshift({
        value: 0,
        name: `${ '0'.green }. Cancelar`
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar: ',
        choices
    }];

    const { id } = await inquirer.prompt( preguntas );

    return id;

};

const confirmar = async ( message = '' ) => {

    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquirer.prompt( question );
    return ok;

};

const mostrarListadoCheck = async ( tareas = [] ) => {

    const choices = tareas
        .map( (tarea, i)  => {
            const idx = (i + 1).toString().green;
            return {
                value: tarea.id,
                name: `${ idx } :: ${ tarea.desc }`,
                checked: ( tarea.completadoEn ) ? true : false,
            };
        });

    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }];

    const { ids } = await inquirer.prompt( pregunta );

    return ids;

};

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheck,
};
