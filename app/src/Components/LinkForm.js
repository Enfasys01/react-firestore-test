import {useState} from 'react'

const LinkForm = (props) =>{
  const initialValue = {
    url:'',
    name: '',
    description:'',

  }
  const [values, setValues] = useState(initialValue)

  const handleSubmit = (e)=>{
    e.preventDefault();
    //console.log(values)
    props.addOrEdit(values)
    setValues({...initialValue})
  }

  const handleInputChange = (e) =>{
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  return(
    <>
    <div className="bg-white bg-opacity-20 py-2 px-3">
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

export default LinkForm