import firestore from '@react-native-firebase/firestore'
import auth, { firebase } from '@react-native-firebase/auth'

//Fetches the  answer set for the question as specified by docNumber
export async function fetchProviderAttribute(docNumber) {
  const doc = await firestore().collection('ProviderAttributes').doc(docNumber).get()
  const map = doc.get('AnswerSet')
  return Object.keys(map).map(key => {
    return {id: key, name: map[key]}
  })
}

//Updates SearchProviders collection in firestore based on choices provided
export function updateSearchProviders(choices, docNumber) {
  const ansCollection = firestore().collection('SearchProviders').doc(docNumber).collection('Answers')
  for (const choice in choices) {
    ansCollection.doc(choice).update({IDs: firebase.firestore.FieldValue.arrayUnion(auth().currentUser.uid)})
  }
}

export function mapObjectToSentence(data) {
  const arr = Object.values(data)
  return arr.map((item, index) => {
    if (index == arr.length -1) {
      return item[0].toUpperCase() + item.substring(1)
    } else {
      return item[0].toUpperCase() + item.substring(1) + ", "
    }
  })
}

export function mapArrayToSentence(arr) {
  return arr.map((item, index) => {
    if (index == arr.length -1) {
      return item[0].toUpperCase() + item.substring(1)
    } else {
      return item[0].toUpperCase() + item.substring(1) + ", "
    }
  })
}

export function getAge(seconds) {
  const dobMS = seconds * 1000
  const age = new Date() - dobMS
  return Math.floor(age / (1000 * 60 * 60 * 24 * 365))
}

export async function filterAsync(arr, callback) {
  const fail = Symbol()
  return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
}