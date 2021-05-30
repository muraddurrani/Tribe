import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore' 

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  return (
    <AuthContext.Provider
      value = {{
        setUser, 
        user,
        isSignUp,
        isClient,
        
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password)
          } catch (e) {
            console.log(e)
          }
        },
        register: async(email, password, firstName, lastName, clientCheck) => {
          try {
            setIsSignUp(true)
            setIsClient(clientCheck)
            await auth().createUserWithEmailAndPassword(email, password)
              .then(() => {
                clientCheck
                  ? firestore().collection("Clients").doc(auth().currentUser.uid).set({firstName, lastName, email})
                  : firestore().collection("Providers").doc(auth().currentUser.uid).set({firstName, lastName, email})
              })
          } catch (e) {
            console.log(e)
          }
        },
        logout: async () => {
          try {
            await auth().signOut()
          } catch (e) {
            console.error(e)
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
