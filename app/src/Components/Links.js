import LinkForm from "./LinkForm"
import {db} from '../firebase.js'
import { collection, addDoc, onSnapshot, query, deleteDoc, doc, getDoc } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import EditPopUp from "./EditPopUp"
import UserContext from "../Context/userContext"
const Links = () =>{

  const [links, setLinks] = useState([])
  const [showPopUp, setShowPopUp] = useState(false)
  const [editLink, setEditLink] = useState({})
  const user = useContext(UserContext)
  const getLinks = async () =>{
    const q = query(collection(db, 'links'))
    const unsub = onSnapshot(q, (querySnapshot)=>{
      let docs = []
      querySnapshot.forEach(doc =>{
        docs = [...docs, { id: doc.id, ...doc.data(),}]
      })
      setLinks(docs)
    })
  }

  useEffect(()=>{
    getLinks()
  })

  const addOrEdit = async (linkObject) => {
    
    try {
      await addDoc(collection(db, 'links'),{...linkObject, uid: user.uid})
      console.log('new link added')
    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this element?')){
      await deleteDoc(doc(db,'links', id))
      console.log(`${id} was deleted`)
    }
  }

  const handleUpdate = (link) => {
    setEditLink(link)
    setShowPopUp(true)
  }

  /*
  const EditPopUp = () => {
    const [values, setValues] = useState(editLink)
  
    const handleSubmit = (e)=>{
      e.preventDefault();
      EditPopUp(false)
      console.log(values)
    }
  
    const handleInputChange = (e) =>{
      const {name, value} = e.target
      setValues({...values, [name]: value})
    }
        <div className=" bg-stone-200 modal text-black py-3 px-4">
          <h1>Edit element</h1>
          <form className='flex flex-col gap-2 text-black' onSubmit={handleSubmit}>
            <input type="text" placeholder='url' name='url' onChange={handleInputChange} value={values.url} required/>
            <input type="text" name="name" placeholder='name' onChange={handleInputChange} value={values.name} required/>
            <textarea placeholder='desciption' name='description' onChange={handleInputChange} value={values.description} required/>
            <button className='place-self-start bg-red-700 py-2 px-3 text-white'>Save</button>
          </form>
        </div>
        return(
          <>
          <form>
          <input type="text" className="text-black"/>
          </form>
          </>
          )
        }
        */

  return(
    <>
    <LinkForm addOrEdit={addOrEdit}/>
    <h1>Links</h1>
    <div className="flex flex-col gap-3">
    {links.map((link, index)=>{
      /*
      const docRef = doc(db, 'users', link.uid)
      const docSnap = await getDoc(docRef)
      console.log(docSnap)
      */
      return(
        <div key={index} className='bg-opacity-20 bg-white py-2 px-3 flex flex-col'>
        <span>{link.uid}</span>
        <span>{link.name}</span>
        <span>{link.url}</span>
        <p>{link.description}</p>
        <div className="flex gap-2">
          <button className="bg-gray-500 place-self-start py-2 px-3" onClick={()=>{handleUpdate(link)}}>Edit</button>
          <button className="bg-red-700 place-self-start py-2 px-3" onClick={()=>{handleDelete(link.id)}}>Delete</button>
        </div>
      </div>
      )
    })}
    {showPopUp?<EditPopUp  editLink={editLink} setShowPopUp={setShowPopUp}/>:''}
    </div>
    </>
  )
}

export default Links