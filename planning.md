## Planes o estructuras de la API

### Cron jobs

- Se tiene una estructura de metodo de scraping por marcas de motos

  ```json:
  scraping_methods: [
    {
      marca: "honda",
      url: "https://www.honda.com.mx/motos"
      get_motos: function() {
        // scrapea la(s) pagina(s) de motos de honda y retorna un array de motos
        [
          {
            imagen: "https://www.honda.com.mx/motos/cb190r.jpg",
            nombre: "CB190R",
            url: "https://www.honda.com.mx/motos/cb190r",
            tipo: "deportiva"
          }
        ]
      },
      get_moto_info: function(moto_url) {
        // scrapea la pagina de la moto y retorna un objeto con la informacion de la moto mapeada
        {
          marca: "Yamaha",
          modelo: "YZF-R1",
          ...otros datos
        }
      },
    },
  ]

  ```

- Se tiene un cron job que se ejecuta cada 48 horas y scrapea las paginas de motos de cada marca y guarda la informacion en la base de datos.
- Se tiene un cron job que se ejecuta cada 24 horas y actualiza la informacion de los motos en la base de datos.
- Se tiene un endpoint que ejecuta el scraping manualmente.

### Endpoints

- `GET /motos/<marca>/<modelo>` devuelve la informacion de la moto.
- `GET /motos/<marca>` devuelve un array de los modelos de la marca.
- `GET /motos` devuelve un array de todos los modelos de todas los marcas.

### Query params

- `?page=<numero>` devuelve la pagina especificada.
- `?sort=<campo>` devuelve los resultados ordenados por el campo especificado.
- `?filter=<campo>:<valor>` filtra los resultados por el campo y valor especificado.
- `?limit=<numero>` limita el numero de resultados.
- `?fields=<campo1>,<campo2>` devuelve solo los campos especificados.
- `?search=<termino>` busca el termino en los campos especificados.

### Base de datos

- Se tiene una base de datos con la estructura del archivo `modelo_datos_moto.jsonc`:
  `{
  marca: "Yamaha",
  modelo: "YZF-R1",
  ...otros datos
}`

### Estructura de carpetas

```
📂/api
  📂/cron_jobs
    📂/scraping
      📄scraping.js
      📄scraping_methods.js
    📂/update
      📄update.js
  📂/endpoints
    📄motos.js
  📂/db
    📄db.js
  📂/utils
    📄utils.js
  📄index.js
```
