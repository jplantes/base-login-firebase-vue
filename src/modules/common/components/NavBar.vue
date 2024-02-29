<template>
  <nav class="flex justify-center my-9">
    
    <div v-if="isLogged" class="flex justify-center">
      <RouterLink class="px-5 py-2 ml-4 rounded text-white bg-green-700 hover:bg-green-400 hover:text-black" to="/">Home</RouterLink>
      <RouterLink class="px-5 py-2 ml-4 rounded text-white bg-green-700 hover:bg-green-400 hover:text-black" to="/about">About</RouterLink>
      <div @click="handleSingOut" class="px-5 py-2 ml-4 rounded text-white bg-green-700 hover:bg-green-400 hover:text-black">Sing Out</div>
    </div>
    
    <div  v-else class="flex justify-center">
      <RouterLink class="px-5 py-2 ml-4 rounded text-white bg-green-700 hover:bg-green-400 hover:text-black" to="/auth">Auth</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const router = useRouter()

const isLogged = ref(false)


onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      isLogged.value = true
    } else {
      isLogged.value = false
    }
  })
})

const handleSingOut = async () => {
  try {
    await signOut(getAuth())
    router.push({ name: 'singin' })
  } catch (error) {
    console.log(error)
  }
}

</script>

<style scoped>

</style>