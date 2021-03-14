const axios = require('axios');
class Busquedas {
    
    constructor(
        historial = [],
    ) {
        // TODO: Leer DB si existe.
        historial = ['Tecpa', 'Madrid', 'San José'];
    }

    get paramsMapBox(){
        return {
            limit: 5,
            language: 'es',
            access_token: process.env.MAPBOX_KEY,
        };
    }

    get paramsOWM(){
        return {
            appid: process.env.OWM_KEY,
            units: 'metric',
            lang: 'es' 
        };
    }


    async ciudad( lugar = '' ){
        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox,
            });

            const {data} = await instance.get();

            return data.features.map( lugar => ({ 
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));


        } catch (error) {

            return []; // Retortar lugares;

        }
        

    }


    async climaLugar( lat, lon ){
        try {
            
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOWM, lat, lon }
            }); 
            
            const {data} = await instance.get();
            
            return {
                desc: data.weather[0].description,
                min: data.main.temp_min,
                max: data.main.temp_max,
                temp: data.main.temp,
            };
            
            
        } catch (error) {
            return {
                desc: 'No se encontro',
                min: 'No se encontro',
                max: 'No se encontro',
                temp: 'No se encontro',
            };
        }
    }

}

module.exports = Busquedas;

