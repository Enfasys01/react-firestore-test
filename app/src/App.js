import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './App.css';
import Links from './Components/Links';
import { UserProvider } from './Context/userContext';
import { auth, db } from './firebase';

function App() {
  const [user, setUser] = useState(false)
  useEffect(()=>{
    onAuthStateChanged(auth, user =>{
      if(user){
        setUser(user)
      }else{
        setUser(false)
      }
    })
  },[])


  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      console.log(result.user.uid)
      const docRef = doc(db, 'users', result.user.uid)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        console.log('the user exists')
      } else{
        console.log('the user does not exist')
        await setDoc(doc(db, 'users', result.user.uid),{displayName:result.user.displayName})
      }
  } catch (error) {
    console.log(error, error.code)
  }
  }


  const logOut = () => {
    signOut(auth)
  }

  return (
    <>
      <div className='container mx-auto'>
        {user?
        <UserProvider value={user}>
        <h1>logges in as: {user.displayName}</h1>
        <button onClick={logOut}>Log out</button>
        <Links/>
        </UserProvider>
        :
        <button className='bg-white py-2 px-3 text-black' onClick={googleSignIn}>Sign in with Google</button>
        }
      </div>
    </>
  );
}

export default App;
