import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
import ModalValidation from './ModalValidation'



export default function Wordle({ solution }) {


   // console.log(solutions);


   const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, notValidWord, setNotValidWord } = useWordle(solution)
   const [showModal, setShowModal] = useState(false)
   const [showModalValidation, setShowModalValidation] = useState(false)





   useEffect(() => {
      window.addEventListener('keyup', handleKeyup)

      if (notValidWord) {
         setTimeout(setShowModalValidation(true), 2000)
         window.removeEventListener('keyup', handleKeyup)
      }
      if (isCorrect) {
         setTimeout(() => setShowModal(true), 2000)
         window.removeEventListener('keyup', handleKeyup)
      }
      if (turn > 5) {
         setTimeout(() => setShowModal(true), 2000)
         window.removeEventListener('keyup', handleKeyup)
      }

      return () => {
         window.removeEventListener('keyup', handleKeyup)
      }
   }, [handleKeyup, isCorrect, turn, notValidWord])


   const handleCloseModal = () => {
      setShowModal(false)
      window.location.reload(false);
   }
   const handleCloseModalValidation = () => {
      setShowModalValidation(false)
      setNotValidWord(false)

   }

   return (
      <div>
         {/* <div>solution: {solution}</div> */}
         {/*   <div>current guess: {currentGuess}</div> */}
         <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
         <Keypad usedKeys={usedKeys} />
         {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} setShowModal={handleCloseModal} />}
         {showModalValidation && <ModalValidation setShowModalValidation={handleCloseModalValidation} notValidWord={notValidWord} />}
      </div>
   )
}
