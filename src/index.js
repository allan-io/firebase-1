import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore'

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

// collection ref
const colRef = collection(db, 'books')

// get real time collection data
onSnapshot(colRef, (snapshot) => {
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
        author: addBookForm.author.value
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
