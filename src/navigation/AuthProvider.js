import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext({})

// Context that provides functions and data associated with user authentication to components application-wide
function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  
  return (
    <AuthContext.Provider
      value = {{
        user, 
        setUser,
        userData,
        setUserData,

        login: async (email, password) => {
          await auth().signInWithEmailAndPassword(email, password)
        },

        signup: async (email, password, accType) => {
          await auth().createUserWithEmailAndPassword(email, password)
          await firestore().collection('Users').doc(auth().currentUser.uid).set({ accountType: accType, profileComplete: false, newAccount: true })
          await firestore().collection(accType).doc(auth().currentUser.uid).set({ email })
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
