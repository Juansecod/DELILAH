[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Juansecod/DELILAH">
    <img src="https://blog.acamica.com/content/images/2020/12/Logo_Redes--Custom-.png" alt="Logo" width="150" height="150">
  </a>

  <h2 align="center">✔DELILAH Restó</h2>

  <p align="center">
    Proyecto que plantea la creación de un sistema de pedidos online para un restaurante. Se debe montar un REST API para interactuar con la estructura de datos diseñada para el consumo del cliente.
    <br />
    <a href="https://github.com/Juansecode/DELILAH"><strong>Explora los documentos »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Juansecod/DELILAH">View Demo</a>
    ·
    <a href="https://github.com/Juansecod/DELILAH/issues">Reportar un Bug</a>
    ·
    <a href="https://github.com/Juansecod/DELILAH/issues">Solicitar alguna función</a>
  </p>
</p>


<!-- TABLA DE CONTENIDO -->
<details open="open">
  <summary>Tabla de contenido</summary>
  <ol>
    <li>
      <a href="#sobre-este-proyecto">Sobre Este Proyecto</a>
      <ul>
        <li><a href="#realizado-con">Realizado Con</a></li>
      </ul>
    </li>
    <li>
      <a href="#empezando">Empezando</a>
      <ul>
        <li><a href="#prerequisitos">Prerequisitos</a></li>
        <li><a href="#instalacion">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#usage">Uso</a>
      <ul>
        <li><a href="#postman">Postman</a></li>
      </ul>
    </li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>



<!-- sobre este proyecto -->
## Sobre Este Proyecto

![image](https://user-images.githubusercontent.com/62673626/126071839-c7cae8f8-4a99-412e-90a7-3cb5c18d158b.png)

Este proyecto plantea la creación de un sistema de pedidos online para un restaurante. Deberás poner en funcionamiento las partes necesarias para montar una REST API que permita realizar altas, bajas, modi?caciones y obtención de información sobre una estructura de datos que podría consumir un cliente. Parte del desafío estará enfocado en lograr que el desarrollo del proyecto sea puesto en producción utilizando web services.

En conclucion, se creara el backend para un sistema de pedidos online para un restaurante poniendo en funcionamiento las partes necesarias para montar una REST API que permita realizar operaciones CRUD sobre una estructura de datos.

### 💻Realizado Con

* [Swagger](editor.swagger.io)
* [NodeJS](https://nodejs.org/es/)
* [MariaDB](https://www.mariadbtutorial.com/getting-started/install-mariadb/)



<!-- GETTING STARTED -->
## 🥳Empezando

Solo sigue estos sencillos pasos para el correcto funcionamiento de nuestra API

### 🤔Prerequisitos

Para poder utilizar este proyecto sin nungun problema necesitamos contar con las siguientes herramientas:
* [NodeJS](https://nodejs.org/es/) (Descargar la version mas reciente)
* Con nodeJS ya listo, instalamaos la version mas reciente de npm
  ```sh
  npm install npm@latest -g
  ```
 * Gestor de base de datos (en este caso utilizaremos [MariaDB](https://www.mariadbtutorial.com/getting-started/install-mariadb/))
 * Un editor de texto o IDE, ya sea Visual Studio Code o el de su preferencia
 * Herramienta para realizar peticiones a nuestra API (en este caso utilizaremos [Postman](https://learning.postman.com/docs/getting-started/installation-and-updates/)).
 * Cliente para el gestor de base de datos, en este caso usamos [DBeaver](https://dbeaver.io/download/)

### 🤯Instalacion

1. Clona el repositorio en tu maquina
   ```sh
   git clone https://github.com/Juansecod/DELILAH.git
   ```
2. Nos paramos sobre nuestra carpeta en guardamos el proyecto
3. Importamos la base de datos en nuestro cliente gestor de bases de datos con el archivo ".sql" (https://www.digitalocean.com/community/tutorials/how-to-import-and-export-databases-in-mysql-or-mariadb)
4. Instalamos los paquetes con npm
   ```sh
   npm install
4. Creamos dentro de la carpeta config un archivo `.env` (Es de suma importancia para crear todo el entorno de trabajo)
5. Dentro de este archivo vamos a realizar la siguiente configuracion:
    ![image](https://user-images.githubusercontent.com/62673626/126071471-237bc31c-90fc-4588-9593-8d8ee7c82e03.png)
6. Ya reemplazados los datos de nuestro gestor de base de datos, copie y pegue las siguientes variables para el correcto funcionamiento del programa
  ```sh
   KEY_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJhZG1pbkBhZG1pbi5jb20iLCJ0aXBvX3VzdWFyaW8iOjIsImlhdCI6MTYyNTcxNzkyMCwiZXhwIjoxNjI1NzIxNTIwfQ.pGpfCH-dZbxmrjstZn7MMD6dmE_RBcdsz4_M0bktXfk
   EXPIRES=1h
   ```


<!-- USAGE EXAMPLES -->
## 🤓Usage
Ya con todo listo e instalado, abrimos la consola de nuestra maquina y el postman para comenzar a realizar peticiones a nuestra base de datos.
De manera opcional en caso de tener que guardar algun cambio para que cargue al instante la aplicacion cuenta con una libreria de desarrollo para evitar tener que detener la 
aplicacion y recargar de nuevo con nodeJS. Para ejecutar esta libreria en nuestra API solo insertamos el siguiente comando en nuestra consola:
  ``` sh
  npm run startApp
  ```
Una vez iniciada a API, comenzamos a realizar peticion a nuestro servidor que acabamos de montar y postman nos muestra la respuestas de estas peticiones. Estas peticiones nos retornan un [Codigo de estado de respuesta HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Status) en donde nos informa el estado de nuestra solicitud. En la anterior URL encuentra mas informacion sobre estos codigos. 

### 🕴Postman
Ejemplo de la petición mostrar productos (path= "/products")
  - Seleccionamos el metodo GET.
  - En la url agregamos la ruta con el path(ruta) que queremos usar(El path global viene a ser el siguiente: "localhost:3000/api/v1", y a este le agregamos el path que vamos a usar: "/products", como observamos en la foto con un color rojo)
  - Realizado este proceso con solo darle enviar nos respondera con el codigo 200(color verde) y una objeto donde nos muestra todos los productos que estan registrados en nuestra base de datos(cuadro azul)
![image](https://user-images.githubusercontent.com/62673626/126074943-fd6a9a50-aa6a-4994-b3ed-c83be358f54a.png)

Ejemplo de la petición iniciar sesion (path= "/users/login")
  - Seleccionamos el metodo "POST".
  - Realizamos el mismo procedimiento de agregar el path que queremos usar: `localhost:3000/api/v1/users/login`
  - En esta peticion requerimos del envio de dos datos del usuario, para ello vamos al apartado body(cuadro Rojo)
  - Seleccionamos la opción Raw(color Verde)
  - Luego seleccionamos el archivo tipo JSON(color Azul)
  - Ahora ingresamos la información del cliente con el que queremos iniciar sesión, acontinuacion un ejemplo:
  ```sh 
   {
      "usuario_mail": "username o correo registrados",
      "contrasena": "contraseña"
   }
   ```
  - Y finalizado el llenado del formulario, enviamos los datos, y nos  responderá con el código 200 en caso de haber ingresado bien los datos.
  - Por ultimo, para mantener la sesion iniciada por 1 hora, guardamos el token(cuadro Blanco) y lo vamos a usar para realizar otras peticiones como actualizar nuestros datos o realizar pedidos.
![image](https://user-images.githubusercontent.com/62673626/126075493-f7df96b4-7ec3-4032-beff-ed26c8474aff.png)

_Para mas ejemplos, por favor importar el archivo spec.yml en [swagger](https://editor.swagger.io) para una mejor comprencion del uso de la API_


<!-- LICENCIA -->
## 🧾Licencia

Distribuido bajo [MIT License](https://choosealicense.com/licenses/mit/). Consulte `LICENSE` para mas información.



<!-- Contacto -->
## 👨‍💻Contacto

Juan Sebastian Rios Valencia - [@Juansecode](https://www.linkedin.com/in/juansecode) - juan.sebastianri28@gmail.com

Link del Proyecto: [https://github.com/Juansecod/DELILAH](https://github.com/Juansecod/DELILAH)







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Juansecod/DELILAH.svg?style=for-the-badge
[contributors-url]: https://github.com/Juansecod/DELILAH/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Juansecod/DELILAH.svg?style=for-the-badge
[forks-url]: https://github.com/Juansecod/DELILAH/network/members
[stars-shield]: https://img.shields.io/github/stars/Juansecod/DELILAH.svg?style=for-the-badge
[stars-url]: https://github.com/Juansecod/DELILAH/stargazers
[issues-shield]: https://img.shields.io/github/issues/Juansecod/DELILAH.svg?style=for-the-badge
[issues-url]: https://github.com/Juansecod/DELILAH/issues
[license-shield]: https://img.shields.io/github/license/Juansecod/DELILAH.svg?style=for-the-badge
[license-url]: https://github.com/Juansecod/DELILAH/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/Juansecode
