import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useRef } from "react";

function App() {
  const [length, setLength] = useState("6")
  const [number, setNumber] = useState("false")
  const [char, setChar] = useState("false")
  const [password, setPassword] = useState("")

  const passwordRef = useRef()

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str +=  "0123456789"
    if (char) str += "!@#$%^&*-_+=[]{}~`"

    for (let index = 1; index < length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
      
    }
    setPassword(pass)

  },[length, number, char, setPassword] )

  const copyToClipBoard = useCallback(() => {
   window.navigator.clipboard.writeText(password)
   passwordRef.current?.select()
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[passwordGenerator, number, char, length])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className=" text-white my-2 text-center">  passwordGenerator</h1>
        <div className=" flex shadow rounded-lg overflow-hidden mb-4">
          <input
            value={password}
            placeholder="password"
            readOnly
            className="outline-none w-full py-1 px-3"
            type="text"
            ref={passwordRef}
          />
          <button className=" outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
          onClick={copyToClipBoard}>
            copy
          </button>
        </div>
        <div className=" flex text-sm gap-x-3">
          <div>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length} </label>
          </div>
          <div className=" flex text-sm gap-x-2">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              className=" cursor-pointer"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className=" flex text-sm gap-x-2">
            <input
              type="checkbox"
              defaultChecked={char}
              id="charInput"
              className=" cursor-pointer"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charInput"> Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
