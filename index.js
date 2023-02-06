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
                if (id === '0') continue; 
                const { nombre, lat, lng } = lugares.find( l => l.id === id );
                //Guardar en BD
                busquedas.guardarHistory( nombre );
                //Clima
                const { tmp, min, max, humedad, descripcion } = await busquedas.clima(lat , lng);
                //Mostrar resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n');
                console.log('Ciudad: ' + nombre);
                console.log('Lat: ' + lat);
                console.log('Lng: ' + lng);
                console.log('Temperatura: ' + tmp + ' °C');
                console.log('Minima: ' + min + ' °C');
                console.log('Maxima: ' + max + ' °C');
                console.log('Humedad: ' + humedad);
                console.log('Descripcion del dia: ' + descripcion);
            break;
            case 2:
                console.log('\n');
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    let idx = i + 1;
                    console.log(idx + ' ' + lugar)
                }); 
            break;
        }

        if ( opt !== 0) await pausa();
        
    } while ( opt !== 0 );


};

main();