//Rota para que somente usuários com email verificado consigam enxergar certas páginas
import {Navigate} from 'react-router-dom'
import { useAuthValue } from '../contexts/FirebaseContext'
import { auth } from '../services/firebase'
//https://stackoverflow.com/questions/51853428/firebase-realtime-db-security-rule-to-allow-specific-users?rq=1

export default function PrivateRoute({children}) {
  const {currentUser} = useAuthValue()

  if(!auth.currentUser?.emailVerified){
    return <Navigate to='/' replace/>
  }

  return children
}