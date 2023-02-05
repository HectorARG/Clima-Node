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
                    const lugares = await busquedas.ciudad(lugar);
                    await listadoLugares(lugares);
                //Buscar los lugares

                //Seleccionar el lugar

                //Clima

                //Mostrar resultados
                console.log('\nInformacion de la ciudad\n');
                console.log('Ciudad');
                console.log('Lat');
                console.log('Lng');
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