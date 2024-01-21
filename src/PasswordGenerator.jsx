import { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    console.log("useCallback");

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (specialCharAllowed) str += "!#$%&'*+,-@[]^_`{}~";

    // generate
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, specialCharAllowed, setPassword]);

  const copyPasswordToClip = useCallback(() => {
    if (!passwordRef.current) {
      return;
    }
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [password]);

  useEffect(() => {
    console.log("usee");
    passwordGenerator();
  }, [length, numberAllowed, specialCharAllowed]);

  return (
    <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 py-4">
      <h1 className="text-2xl font-bold text-center text-black mb-6">
        Password Generator
      </h1>
      <div className="flex rounded-lg overflow-hidden mb-4">
        <input
          className="border p-2 w-full outline-none text-blue-600 font-semibold bg-blue-100"
          readOnly
          type="text"
          value={password}
          onChange={() => passwordGenerator()}
          ref={passwordRef}
        />
        <button
          className={`bg-blue-500 p-2 font-semibold text-white w-2/12 shrink-0 ${isCopied?'bg-green-500':''}`}
          onClick={copyPasswordToClip}
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="flex gap-x-2 text-sm justify-between">
        <div className="flex gap-x-1">
          <input
            id="range"
            type="range"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min={8}
            max={36}
          />
          <label htmlFor="range">Length : {length}</label>
        </div>
        <div className="flex gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            value={numberAllowed}
            id="number"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="number">Number{numberAllowed}</label>
        </div>
        <div className="flex gap-x-1">
          <input
            id="char"
            type="checkbox"
            defaultChecked={specialCharAllowed}
            value={specialCharAllowed}
            onChange={() => setSpecialCharAllowed((prev) => !prev)}
          />
          <label htmlFor="char">Character{specialCharAllowed}</label>
        </div>
      </div>
    </div>
  );
};
export default PasswordGenerator;
