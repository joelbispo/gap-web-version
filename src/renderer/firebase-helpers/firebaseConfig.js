import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: 'AIzaSyDoJWnoD_jj4RcrB_Ft7PprrUJoHfIbP80',
  authDomain: 'gap-app-35c12.firebaseapp.com',
  databaseURL: 'https://gap-app-35c12.firebaseio.com',
  projectId: 'gap-app-35c12',
  storageBucket: 'gap-app-35c12.appspot.com',
  messagingSenderId: '230381297931'
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
