import React, { useState, useEffect } from 'react'
import { letters } from '../db/localDb'




export default function Keypad({ usedKeys }) {

   const [lettersDb, setLetters] = useState(letters)


   console.log(lettersDb, usedKeys)



   return (
      <div className='keypad'>
         {lettersDb && lettersDb.map(letter => {
            const color = usedKeys[letter.key]
            return (
               <div key={letter.key} className={color}
               >{letter.key}</div>
            )
         })}
      </div>
   )
}
