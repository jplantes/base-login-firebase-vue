import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router';



export const authComposable = () => {


  const router = useRouter()

  const email = ref('')
  const password = ref('')


  const iniciarSession = async () => {
    try {
      const usuario = await signInWithEmailAndPassword(getAuth(), email.value, password.value)
      console.log( 'Ingreso' )
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const register = async () => {
    try {
      const usuario = await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      console.log(usuario)
      router.push({ name: 'home' })
    } catch (error) {
      console.log(error)
    }
  }



  return {
    email,
    password,
    iniciarSession,
    register,
  }
}