import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [accType, setAccType] = useState()
  
  return (
    <AuthContext.Provider
      value = {{
        setUser, 
        user,
        isSignUp,
        accType,

        login: async (email, password) => {
          await auth().signInWithEmailAndPassword(email, password)
        },
        signup: async (email, password, accType) => {
          await auth().createUserWithEmailAndPassword(email, password).
            then(() => firestore().collection(accType).doc(auth().currentUser.uid).set({email}))
          setAccType(accType)
          setIsSignUp(true)
        },
        logout: async () => {
          await auth().signOut().catch(error => console.log(error))
        }
      }}
    >
      {children} 
    </AuthContext.Provider>
  )
}

export default AuthProvider
