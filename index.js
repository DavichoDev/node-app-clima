const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");
require('dotenv').config();

const main = async () => {

    let opt;
    const busqueda = new Busquedas();

    
    do {
            
        opt = await inquirerMenu();

        switch (opt) {
            
            case 1:
            // Mostrar mensaje.
            const termino = await leerInput('Ciudad: ');  
            
            // 👍 Buscar los lugares.
            const lugares = await busqueda.ciudad(termino);
            
            // 😎 Seleccionar lugar.
            const id = await listarLugares( lugares );
            if ( id === 0 ) break;
            
            // 🐱‍👤 Datos del clima.
            const {nombre, lat, lng } = lugares.find( l => l.id === id );
            const {desc, min, max, temp} = await busqueda.climaLugar(lat, lng);
            
            console.log({desc, min, max, temp});
            console.log('\nInformacion de la ciudad.\n '.green); 
            console.log('Ciudad: ', nombre); 
            console.log('Lat: ', lat); 
            console.log('Lng: ',  lng); 
            console.log('Temperatura: ', temp); 
            console.log('Minima: ', min); 
            console.log('Maxima: ', max); 
            console.log('Como esta el clima: ', desc); 
            break;
        
            case 2:
            break;

            default:
            break;
        }

        if (opt !== 0) await pausa();

    } while ( opt !== 0 );

};

main();