import React, { useCallback, useEffect } from 'react'

export default function Modal({ isCorrect, turn, solution, setShowModal }) {


   const handleKeyUp = useCallback(
      (event) => {
         if (event.key === 'Enter' || /^[A-Za-z]$/.test(event.key) || event.key === 'Backspace' || event.code === "Space" || /^[a-zA-Z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/) {
            setShowModal(false)
         }
      },
      [setShowModal],
   )


   useEffect(() => {
      window.addEventListener('keyup', handleKeyUp)

      return (() => {
         window.removeEventListener('keyup', handleKeyUp)
      })
   }, [handleKeyUp])




   return (
      <div className='modal'>

         {isCorrect && (
            <div onKeyUp={handleKeyUp} >

               <h1>You Win!!!</h1>
               <p className='solution'>{solution}</p>
               <p>You found the solution in {turn} guesses :)</p>
               <button onClick={() => setShowModal(false)}>X</button>
            </div>
         )}
         {!isCorrect && (
            <div onKeyUp={handleKeyUp} >

               <h1>At least you have your inner beauty!</h1>
               <p className='solution'>{solution}</p>
               <p>Better luck next time :)</p>
               <button onClick={() => setShowModal(false)}>X</button>
            </div>
         )}
      </div>
   )
}
