import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { app } from '@/firebase.config'
import { removeAuth, setAuth } from '@/store/auth/authSlice'
import { useAppDispatch } from '@/store/hooks'
import { useAppSelector } from '../hooks'
import { selectAuth } from './authSlice'

export const useAuth = () => {
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const dispatch = useAppDispatch()

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = JSON.parse(JSON.stringify(result.user))
      dispatch(setAuth(user))
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  const logout = async () => {
    try {
      await auth.signOut()
      dispatch(removeAuth())
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return {
    login: login,
    logout: logout,
    data: useAppSelector(selectAuth),
  }
}
