# Maqueta inicial para proyectos en VUE 3 con rutas protegidas


> Se usa como sistema de back-end y autencasion Firebase

### Archivo de configuración firebase "firebase.config.ts"

1.- copiar el archivo "firebase.template.config.ts" y renombrar como "firebase.config.ts"

2.- Completar los datos con su cuenta de firebase en el objeto:

```javaScript
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
}
```

### Para levantar el proyecto

correr los comandos:

```sh
yarn
```

y 

```sh
yarn dev
```