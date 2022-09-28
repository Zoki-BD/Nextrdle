import React, { useEffect, useCallback } from 'react'

export default function Modal({ setShowModalValidation }) {


   //  regex all keypad buttons
   //  /^[a-zA-Z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/

   //regex only letters
   ///^[A-Za-z]$/.test(event.key)

   const handleKeyUp = useCallback(
      (event) => {
         if (event.key === 'Enter' || /^[A-Za-z]$/.test(event.key) || event.key === 'Backspace' || event.code === "Space" || /^[a-zA-Z0-9~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]*$/) {
            setShowModalValidation(false)
         }
      },
      [setShowModalValidation],
   )


   useEffect(() => {
      window.addEventListener('keyup', handleKeyUp)

      return (() => {
         window.removeEventListener('keyup', handleKeyUp)
      })
   }, [handleKeyUp])



   return (
      <div className='modal'>
         <div onKeyUp={handleKeyUp}  >
            <h1>You must enter a valid word !</h1>
            <button onClick={() => setShowModalValidation(false)}>X</button>
         </div>

      </div>
   )
}
