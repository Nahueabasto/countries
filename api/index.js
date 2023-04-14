//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require ('axios');
const {Country} = require ('./src/db');
const { all } = require('./src/app.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    //Consulto si la base de datos tiene algo
    const allCountries = await Country.findAll();

    if (allCountries.length === 0){
    getInfo();
    } else {
        console.log('The database is charged.')
    }
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

//Checkear - VER findorcreate
const getInfo = () => axios.get('https://restcountries.com/v3/all',{
    headers: {
        "accept-encoding": null
    }
})
.then(async r => {
    // await Country.sync({ force: true })
    r.data.map(async c => {
        await Country.create({
            id:c.cca3,
            ///////VER las traducciones de los nombres de los países y también los símbolos que tienen y traen consigo de la API /////////
            name: c.name.common && c.translations.spa.common,
            image: c.flags[0],
            continent: c.region,
            capital: typeof c.capital !== 'undefined' ? c.capital[0] : 'No se encontró la capital en la base de datos',
            subregion: typeof c.subregion !== 'undefined' ? c.subregion : 'No hay subregión para este país',
            area: c.area,
            population: c.population
        })
        // console.log (r.data)
    });
});





// conn.sync({ force: true }).then(() => {
//     server.listen(3001, () => {
//       getInfo();
//       console.log('%s listening at 3001'); // eslint-disable-line no-console
//     });
//   });
  
//   //Checkear - VER findorcreate
//   const getInfo = () => axios.get('https://restcountries.com/v3/all',{
//       headers: {
//           "accept-encoding": null
//       }
//   })
//   .then(async r => {
//       // await Country.sync({ force: true })
//       r.data.map(async c => {
//           await Country.create({
//               id:c.cca3,
//               ///////VER las traducciones de los nombres de los países y también los símbolos que tienen y traen consigo de la API /////////
//               name: c.name.common && c.translations.spa.common,
//               image: c.flags[0],
//               continent: c.region,
//               capital: typeof c.capital !== 'undefined' ? c.capital[0] : 'No se encontró la capital en la base de datos',
//               subregion: typeof c.subregion !== 'undefined' ? c.subregion : 'No hay subregión para este país',
//               area: c.area,
//               population: c.population
//           })
//           // console.log (r.data)
//       });
//   });