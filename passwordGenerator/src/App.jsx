import { useState, useCallback, useRef, useEffect } from 'react'
import './App.css'
// checkout Readme.md in this project

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false) // Add copied state


  const passwordGenerator = useCallback(() => {
    let password_now = ""
    let str = "AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      password_now += str.charAt(char)

    }

    setPassword(password_now)

  }, [length, numberAllowed, charAllowed, setPassword])

  const passwordRef = useRef(null)

  // const copyPasswordToClipboard = useCallback(() => {
  //   passwordRef.current?.select();
  //   // passwordRef.current?.setSelectionRange(0, 999);
  //   window.navigator.clipboard.writeText(password)
  // }, [password])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password).then(() => {
      setCopied(true) // Show "Copied!" after successful copy

      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    })
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className="w-full max-w-md mx-auto shadow-white shadow-lg rounded-3xl px-4 py-3 my-8 bg-slate-400 text-slate-100">
      <h1 className='text-white text-center my-3 font-semibold text-2xl'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        {/* <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button> */}

        <button
          onClick={copyPasswordToClipboard}
          className={`outline-none px-3 py-0.5 shrink-0 transition duration-200 ease-in 
            ${copied ? 'bg-green-600' : 'bg-blue-700'} text-white`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
