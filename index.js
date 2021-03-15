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
                        
            // 🐱‍👤 Datos del lugar.
            const lugarSel = lugares.find( l => l.id === id );

            // ✔ Guardar en DB
            busqueda.agregarHistorial( lugarSel.nombre );

            // 😜 Información del clima.
            const {desc, min, max, temp} = await busqueda.climaLugar(lugarSel.lat, lugarSel.lng);

            console.log('\nInformacion de la ciudad.\n '.green); 
            console.log('Ciudad: ', lugarSel.nombre); 
            console.log('Lat: ', lugarSel.lat); 
            console.log('Lng: ',  lugarSel.lng); 
            console.log('Temperatura: ', temp); 
            console.log('Minima: ', min); 
            console.log('Maxima: ', max); 
            console.log('Como esta el clima: ', desc); 
            break;
        
            case 2:
                console.log();
                await busqueda.leerDB();
                busqueda.historial.forEach( (lugar, i) => {
                    const idx = `${ i + 1 }`.green;
                    console.log(`${ idx } ${ lugar }`);
                });
            break;

            default:
            break;
        }

        if (opt !== 0) await pausa();

    } while ( opt !== 0 );

};

main();