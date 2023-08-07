# md-oplinks


![md-oplinks](./img/mdlinks.jpg) 
 
 

#### ¿Que es md-oplinks y para que sirve?<a name='a'></a>
Es una herramienta de linea de comando (CLI) y una libreria instalable que facilita a los usuarios buscar y analizar archivos markdown (.md) con solo proporcionar la ruta que se quiere examinar. También permite verificar si los archivos .md encontrados tienen links y si estos estan funcionando correcatamente o no.

La estructura del módulo es  la siguiente

![Diagrama de flujo](./img/Diagrama.jpg)



#### ¿Como instalar?

Para instalar la libreria debes seguir los siguientes pasos:

1. Abrir la terminal del sistema operativo de la pc.
2.  Navegar hasta el directorio raíz del proyecto o la ubicación donde desea instalar la biblioteca.
2. Ejecutar el siguiente comando en la terminal para instalar la biblioteca desde el registro del paquete npm: 

```sh
npm install md-oplinks
```
3. Una vez completada la instalación, puede importar y usar la biblioteca en el proyecto de acuerdo con las instrucciones de uso que se proporcionan a continuación.


#### ¿Como usar?

Una vez instalado, se debe colocar en la terminal lo siguiente: 

```sh
npx md-oplinks <path> [opciones]
```
 donde:
  
 path = es la ruta que se quiere analizar. Cabe destacar que la ruta puede ser absoluta o relativa. 

 options = es la manera en la que se solicita se expresen los resultados del análisis.

 Si se ingresa
  ```sh 
  --validate 
  ```
  El módulo hara una solicitud HTTP para verificar si el o los links encontrados funcionan o no y en el output se obtendrá 
    href,
    text,
    file,
    status,
    ok.

Por ejemplo:

```sh
$ md-oplinks ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

 Si se ingresa 
  ```sh 
  --stats 
  ```
Se recibirá un texto con estadísticas básicas sobre los enlaces, incluyendo el número total de enlaces y el número de enlaces únicos.

Por ejemplo: 

```sh
$ md-oplinks ./some/example.md --stats
Total: 3
Unique: 3
```

 Si se ingresa 
  ```sh 
  -- validate --stats 
  ```
 Se obtendrá un texto con estadísticas completas que incluyen enlaces invalidos o "rotos". 

 Por ejemplo:

   ```sh
$ md-oplinks ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
#### Efectividad del pprograma

Se realizaron pruebas unitarias para la verificación del correcto funcionamiento de las unidades de código principales (main.js). Se obtuvo el siguiente resultado:

![test](./img/test.JPG)


