import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const[numberAloud, setNumberAloud] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");


  const passwordGenerator= useCallback(() => {
    let pass= ""
    let str= "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    if(numberAloud) str += "0123456789"
    if(characters) str += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    for(let i=1; i<= length; i++){
      let char= Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAloud,characters, setPassword])
  
  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAloud,characters, setPassword])

  const passwordRef = useRef(null)
  const handelCopy = useCallback(() => {
    passwordRef.current?.select()
   window.navigator.clipboard.writeText(password)
  }, [password])

  return (
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className="text-white text-center my-3">Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input className="outline-none w-full py-1 px-3" type="text" value={password} placeholder="Password" ref={passwordRef} readOnly/>
      <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={handelCopy}>Copy</button>
    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex text-sm gap-x-2">
        <input type="range" min={8} max={40} value={length} className="cursor-pointer" onChange={(e)=>{setLength(e.target.value)}}/>
        <label className="text-yellow-300 text-sm">Length: {length}</label>
        <input type="checkbox" id="numberAloud" defaultChecked= {numberAloud} onChange={()=>{setNumberAloud((prev)=> !prev)}}/>
        <label htmlFor="numberAloud" className="text-sm text-yellow-300">Numbers</label>
        <input type="checkbox" id="characters" defaultChecked= {characters} onChange={()=>{setCharacters((prev)=> !prev)}}/>
        <label htmlFor="characters" className="text-sm text-yellow-300">Characters</label>
      </div>
    </div>
   </div>
  )
}