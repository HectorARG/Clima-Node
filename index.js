require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    const busquedas = new Busquedas(); 
    let opt = ''; 

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                //Buscar los lugares
                const lugares = await busquedas.ciudad(lugar);
                //Seleccionar el lugar
                const id = await listadoLugares(lugares);
                const lugarSelec = lugares.find( l => l.id === id );

                //Clima

                //Mostrar resultados
                console.log('\nInformacion de la ciudad\n');
                console.log('Ciudad: ' + lugarSelec.nombre);
                console.log('Lat: ' + lugarSelec.lat);
                console.log('Lng: ' + lugarSelec.lng);
                console.log('Temperatura');
                console.log('Minima');
                console.log('Maxima');
            break;
            case 2:
                console.log('selected 2')    
            break;
        }

        if ( opt !== 0) await pausa();
        
    } while ( opt !== 0 );


};

main();