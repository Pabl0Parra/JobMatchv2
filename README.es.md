[![English](https://img.shields.io/badge/language-English-blue.svg)](README.en.md)

<div align="center">
  <p align="center">   
    <image src="https://user-images.githubusercontent.com/98957023/222693439-c7cdb4da-89f0-414c-ac9e-f4a52cd5f800.png"        alt="logo width="200" height="100">
  </p>

# **:clapper: Vídeo de presentación**

**_Pulsa play para reproducirlo, habilita el sonido si deseas :sound:_**

[video_jobmatch.webm](https://user-images.githubusercontent.com/98957023/222695129-5df800a7-567a-4899-b8bc-4ab8f30e3b41.webm)

  <br />
  
  <p align="center">
    <a href="https://drive.google.com/file/d/1UD8evgeo8afK1Zifod-eAc6ROREokwjy/view?usp=share_link" target="_blank" rel="noopener noreferrer">Descargar JobMatch</a>
    :link:
    <a href="https://github.com/No-Country/C9-47-ft-ReactNative/issues" target="_blank">Reportar error</a>
    :link:
    <a href="https://github.com/No-Country/C9-47-ft-ReactNative/issues" target="_blank">Solicitar nueva funcionalidad</a>
  </p>
</div>

<details>
  <summary>Tabla de contenidos</summary>
  <ol>
    <li><a href="#introducción">Introducción</a></li>       
    <li><a href="#diseño">Diseño</a></li>   
    <li><a href="#prerequisitos">Prerequisitos</a></li>    
    <li><a href="#librerías-externas">Librerias externas</a></li>
    <li><a href="#funcionalidades">Funcionalidades</a></li>
    
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

<br />

## Introducción

- JobMatch es una aplicación que permite crear nuevas relaciones laborales al estilo Tinder. Te puedes registrar como candidato o como empresa que busca nuevos empleados.
- Una vez creado tu perfil puedes ver ofertas de trabajo (si estás en búsqueda de empleo) o ver candidatos que cumplan los requisitos que tu empresa necesita.
- Al hacer match, se crea un chat, dando así la oportunidad de conocerse y ver si cabe la posibilidad de entablar una relación laboral.

## Diseño

- El diseño se puede ver en [Figma](https://www.figma.com/file/7LXyAnXTSPlwpIZfNyhl9T/JobMatch*?node-id=3%3A271&t=LuAB7656ZLoEoyh2-0).

## Prerequisitos

- Necesitarás [Git](https://git-scm.com).
- Instala [Node.js](https://nodejs.org/en/download/) (que viene con [npm](http://npmjs.com)) en tu ordenador.
- También necesitaras tener instalado [Expo CLI](https://docs.expo.dev/workflow/expo-cli/).
- Ejecuta `npx create-expo-app my-app && cd my-app`
- Crea una cuenta en [Firebase](https://firebase.google.com/).
- Sigue la [documentación](https://firebase.google.com/docs/web/setup?hl=es-419) para crear tus credenciales e importarlas a tu proyecto.
- Crea un archivo llamado `.env`, añade tus credenciales de Firebase en ese archivo, agregalo el archivo .env a .gitignore (para evitar que se suba a Github).
- Para arrancar el proyecto haz `npm i` para crear los node_modules, luego `npm i` para lanzar el proyecto.
  <br />

## Librerías externas

- [Yup](https://github.com/jquense/yup)
- [Formik](https://formik.org/)
- [React-navigation](https://reactnavigation.org/)
- [React-native-svg](https://github.com/software-mansion/react-native-svg)
- [React-native-web](https://necolas.github.io/react-native-web/)
- [React-native-paper](https://reactnativepaper.com/)
- [React-native-screens](https://github.com/software-mansion/react-native-screens)
- [React-native-text-ticker](https://www.npmjs.com/package/react-native-text-ticker)
- [React-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat)
- [React-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React-native-deck-swiper](https://www.npmjs.com/package/react-native-deck-swiper)
- [React-native-awesome-alerts](https://www.npmjs.com/package/react-native-awesome-alerts)
- [React-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
- [React-native-dropdown-select-list](https://www.npmjs.com/package/react-native-dropdown-select-list)

## Funcionalidades

- :white_check_mark: Registrarse con email y password.
- :white_check_mark: Crear perfil como candidato o empresa.
- :white_check_mark: Editar perfiles después de haber sido creados.
- :white_check_mark: Ver perfiles de candidatos o de puestos de trabajo disponibles.
- :white_check_mark: Filtrar perfiles por puestos de trabajo, años de experiencia, etc...
- :white_check_mark: Añadir perfil a tus favoritos.
- :white_check_mark: Darle a gustar o no gustar para hacer match, así como deslizar a la derecha o izquierda un perfil para conseguir lo mismo.
- :white_check_mark: Una vez existe un match, se puede empezar a hablar por el chat de la app.

## QA Testing

**_Pulsa sobre cada imagen para expandirla_**

<p align="center">
<img src="https://user-images.githubusercontent.com/98957023/222697406-0bb22d1b-6043-4a45-a59c-242f0125f619.png" alt="image" width="300" height="200" style="display:inline-block">
<img src="https://user-images.githubusercontent.com/98957023/222697646-82d6361c-0c67-4059-9392-8f5af16b6294.png" alt="image" width="300" height="200" style="display:inline-block">
<br />
<img src="https://user-images.githubusercontent.com/98957023/222697793-3c7fa65c-3a61-4343-9b9b-db03ebd9443c.png" alt="image" width="300" height="200" style="display:inline-block">
<img src="https://user-images.githubusercontent.com/98957023/222697915-a42296cb-7f74-4609-b39c-f56b82b1c10b.png" alt="image" width="300" height="200" style="display:inline-block">
<img src="https://user-images.githubusercontent.com/98957023/222697985-19974495-f79a-42e0-8021-89e4b6e7ab60.png" alt="image" width="300" height="200" style="display:inline-block">
</p>

## Contacto

<li>Pablo Parra  <a target="_blank" href="https://www.linkedin.com/in/pablo-parra-bcn/"><img  width="20px" height="20px" src="https://lh3.googleusercontent.com/drive-viewer/AJc5JmT3rEWw0KwxXzlpI_BpGFOCQmGN4Bxy53pidk-bfuo02PpRqwIXqZ9ISLN5Nk0AJOg2Z_7JqZA=w1265-h817" /></a></li>

> **Note** > **_Se aceptan pull requests para mejoras, así como nuevas funcionalidades o para avisar de posibles bugs encontrados durante su uso._**
