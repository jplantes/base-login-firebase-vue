<script setup lang="ts">
import { getFirestore, addDoc, getDocs, collection, QueryDocumentSnapshot } from 'firebase/firestore'

import { type Usuario, FirebaseCollections } from '@/modules/common/interfaces/firebaseColections'
import { ref } from 'vue';
const db = getFirestore()


const usuario = ref<Usuario[]>([])

const uid = localStorage.getItem('uid') || 'no-uid'


const usuarioInsert: Usuario = {
  nombre: 'Juan',
  apellido: 'Perez',
  email: 'juan.perez@gmail.com',
  estado: true,
}

const addData = async ( datosColeccion: any, coleccion: keyof typeof FirebaseCollections ) => {
  await addDoc(collection(db, uid, 'colecciones', coleccion ), datosColeccion)
  
  recuperarDatos( 'USUARIOS' )
}


const recuperarDatos = async (coleccion: string) => {
  const querySnapshot = await getDocs(collection(db, uid, 'colecciones', coleccion))
  
  usuario.value = querySnapshot.docs.map( (doc: QueryDocumentSnapshot) => {
    return doc.data() as Usuario
  })

  // querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
  //   // console.log(doc.id, " => ", doc.data())
  // })
}

recuperarDatos( 'USUARIOS' )


</script>

<template>
  <div>
    <h1>About</h1>
    <p>This is the about page</p>    

    <button @click="addData( usuarioInsert, 'USUARIOS' )" class="btn"> agregar data</button>

    <div class="mt-5">
      <table class="table table-pin-rows">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user of usuario" :key="user.email">
            <td>{{ user.nombre }}</td>
            <td>{{ user.apellido }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>  
</template>

<style lang="scss" scoped>

</style>