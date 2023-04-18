import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBvP2kva6wmqAdW_aBWSDAi6vQ4vOO3xt0",
    authDomain: "fir-1-ce38b.firebaseapp.com",
    projectId: "fir-1-ce38b",
    storageBucket: "fir-1-ce38b.appspot.com",
    messagingSenderId: "157102159533",
    appId: "1:157102159533:web:cc41cab3ed8e186e797824"
  }

  // init firebase app
  initializeApp(firebaseConfig)

//   init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, where('author', '==', 'allan'), orderBy('createdAt'))

// get real time collection data
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data() , id: doc.id})
    })
    console.log(books)
})



// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBookForm.reset()
    })
})

//deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})

// get a single document

const docRef = doc(db, 'books', 'SFPMK54VXoqJFlM8KKEg')

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// update a document
const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateBookForm.id.value)

    updateDoc(docRef, {
        author: 'AO'
    })
    .then(() => {
        updateBookForm.reset()
    })

})

// signing user up
const signupForm = document.querySelector('.signup')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created: ', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})
