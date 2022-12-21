import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

export default function EditPopUp (props) {
  const [values, setValues] = useState(props.editLink)
  
    const handleSubmit = async (e)=>{
      e.preventDefault();
      console.log(values)
      await setDoc(doc(db,'links', values.id), values)
      props.setShowPopUp(false)
    }
  
    const handleInputChange = (e) =>{
      const {name, value} = e.target
      setValues({...values, [name]: value})
    }
        return(
          <>
            <div className=" bg-stone-200 modal text-black py-3 px-4">
              <h1>Edit element</h1>
              <form className='flex flex-col gap-2 text-black' onSubmit={handleSubmit}>
                <input type="text" placeholder='url' name='url' onChange={handleInputChange} value={values.url} required/>
                <input type="text" name="name" placeholder='name' onChange={handleInputChange} value={values.name} required/>
                <textarea placeholder='desciption' name='description' onChange={handleInputChange} value={values.description} required/>
                <button className='place-self-start bg-red-700 py-2 px-3 text-white'>Save</button>
              </form>
            </div>
          </>
          )
        }
