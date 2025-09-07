import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  // Password Generator
  const passwrodGenerate = useCallback(() => {
    let pass = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      characters += "0123456789";
    }
    if (characterAllowed) {
      characters += "!@#$%^&*()_+";
    }
    for (let i = 0; i <= length; i++) {
      const randomValue = Math.floor(Math.random() * characters.length + 1);
      pass += characters.charAt(randomValue);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwrodGenerate();
  }, [length, numberAllowed, characterAllowed, passwrodGenerate]);

  // using useRef to copy the password
  const copyPassword = useCallback(() => {
    
    navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-gray-900 w-[70%] h-40 flex flex-col items-center gap-4 py-4 px-4 rounded text-white">
          <h1 className="font-bold text-xl">Password Generator</h1>
          <div className="w-full">
            <div className="mb-2">
              <input
                type="text"
                required
                value={password}
                readOnly
                className="bg-white outline-none w-[80%] text-yellow-500 px-2 py-1 rounded-s-lg"
              />
              <button
                onClick={copyPassword}
                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer outline-none w-[20%]  px-2 py-1 rounded-r-lg"
              >
                Copy
              </button>
            </div>
            <div className="flex gap-2 text-yellow-700 items-center">
              <input
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                min={6}
                max={100}
                value={length}
                type="range"
              />
              <label htmlFor=""> Length( {length})</label>

              <input
                onChange={(e) => {
                  setNumberAllowed((prev) => !prev);
                }}
                type="checkbox"
                defaultChecked={numberAllowed}
              />
              <label htmlFor="">Numbers</label>

              <input
                onChange={(e) => setCharacterAllowed((prev) => !prev)}
                defaultChecked={characterAllowed}
                type="checkbox"
              />
              <label htmlFor="">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
