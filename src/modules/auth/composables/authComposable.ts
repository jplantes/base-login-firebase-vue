import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth'
import { useRouter } from 'vue-router';



export const authComposable = () => {


  const router = useRouter()

  const email = ref('')
  const password = ref('')


  const iniciarSession = async () => {
    try {
      const usuario: UserCredential = await signInWithEmailAndPassword(getAuth(), email.value, password.value)
      
      guardarUsuario(usuario)

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const register = async () => {
    try {
      const usuario = await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      
      guardarUsuario(usuario)

      router.push({ name: 'home' })
    } catch (error) {
      console.log(error)
    }
  }

  const guardarUsuario = (usuario: UserCredential) => {
    const uid = usuario.user.uid || ''
    localStorage.setItem('uid', uid)

    console.log( getAuth().currentUser )
  }



  return {
    email,
    password,
    iniciarSession,
    register,
  }
}