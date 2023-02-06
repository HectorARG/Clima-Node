const fs = require('fs');

const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/databases.json';

    constructor() {
        this.leerBD();
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather(){
        return {
            appid: `${ process.env.Open_Weather }`,
            units: 'metric',
            lang: 'es'
        }
    }

    get historialCapitalizado(){
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        })
    }

    async ciudad( lugar = '' ) {
        //TODO: Peticion HTTP
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        } catch (error) {
            return[] //Retorna los lugares que coincidan
        }
    }

    async clima ( lat = '',  lon = '',){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            });
            const resp = await instance.get();
            return {
                tmp: resp.data.main.temp,
                min: resp.data.main.temp_min, 
                max: resp.data.main.temp_max, 
                humedad: resp.data.main.humidity,
                descripcion: resp.data.weather[0].description
            }
        } catch (error) {
            return null; //Retorna los
        }
    }

    guardarHistory(lugar = ''){

        //Validacion duplicados
        if(this.historial.includes(lugar.toLowerCase())){
            return;
        }
        //Agregar a la lista
        this.historial.unshift(lugar.toLowerCase());

        //Grabar en BD
        this.gusrdarBD();

    }

    gusrdarBD(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))

    }

    leerBD(){

        if (!fs.existsSync(this.dbPath)) {
            return;
        }

        const info = fs.readFileSync(this.dbPath , { encoding: 'utf-8' } );

        const data = JSON.parse(info);
        
        this.historial = data.historial;

    }

}

module.exports = Busquedas;