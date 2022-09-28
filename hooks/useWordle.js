import { useState } from "react"
import { validWords } from "../db/localDb"


const useWordle = (solution) => {

   const [turn, setTurn] = useState(0) // these are the tries
   const [currentGuess, setCurrentGuess] = useState('')
   const [guesses, setGuesses] = useState([...Array(6)]) //each guess is array. Couse we have only 6 tries to guess we create in the start array with 6 indexes(places )
   const [history, setHistory] = useState([])  //each guess is string
   const [isCorrect, setIsCorrect] = useState(false)
   const [notValidWord, setNotValidWord] = useState(false)





   const [usedKeys, setUsedKeys] = useState({}) //{a: 'green, b: 'yellow', c: 'grey'}


   //format a guess into an array of letter objects
   // e.g [{key: 'a', color: 'yellow'}]
   const formatGuess = () => {
      let solutionArray = [...solution] //we make array of letters


      let formattedGuess = [...currentGuess].map(letter => {
         return { key: letter, color: 'grey' } //default is grey
      })


      //find any green letters
      formattedGuess.forEach((letter, index) => {
         if (solutionArray[index] === letter.key) {
            formattedGuess[index].color = 'green'
            solutionArray[index] = null //we make it null cause its matched already
         }
      })

      //Eg: solution is 'piped', we  enter: 'plans'. p is null- '_iped'

      //find any green letters
      formattedGuess.forEach((letter, index) => {
         if (solutionArray.includes(letter.key) && letter.color !== 'green') {
            formattedGuess[index].color = 'yellow'
            solutionArray[solutionArray.indexOf(letter.key)] = null //we make it null cause its matched already, but with indexOf method .We find where in solutionArray of letteres this letter.key belongs and make it null
         }
      })
      return formattedGuess
   }


   let r = validWords.map(word => word.word).find(x => x === currentGuess.toUpperCase())

   console.log(r);

   // const x = wordExists(currentGuess)

   //add a new guess to the guesses state
   //update the isCorrect state if the guess is correct
   //add one to the turn state
   const addNewGuess = (formatted) => {

      if (r === undefined) {
         setNotValidWord(true)
         return
      }

      if (currentGuess === solution) {
         setIsCorrect(true)
      }


      setGuesses(prevGuesses => {
         let newGuesses = [...prevGuesses] //6 undefined on start
         newGuesses[turn] = formatted
         return newGuesses
      })

      setHistory(prevHistory => {
         return [...prevHistory, currentGuess]
      })

      setTurn(prevTurn => {
         return prevTurn + 1
      })

      setUsedKeys(prevUsedKeys => {
         let newKeys = { ...prevUsedKeys }

         formatted.forEach(letter => {
            const currentColor = newKeys[letter.key]

            if (letter.color === 'green') {
               newKeys[letter.key] = 'green'
               return
            }
            if (letter.color === 'yellow' && currentColor !== 'green') {
               newKeys[letter.key] = 'yellow'
               return
            }
            if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
               newKeys[letter.key] = 'grey'
               return
            }
         })
         return newKeys;
      })

      setCurrentGuess('')
   }


   //handle keyup event & track current guess
   //if user presses enter, add the new guess
   const handleKeyup = ({ key }) => {
      if (key === 'Enter') {
         // only add guess if turn is greater than 5
         if (turn > 5) {
            console.log('You used all your guesses');
            return //kraj
         }
         // do not duplicate words
         if (history.includes(currentGuess)) {
            console.log('You already tried that word');
            return //kraj
         }
         // check word is 5 chars long
         if (currentGuess.length !== 5) {
            console.log('Word must be 5 chars long');
            return //kraj
         }

         const formatted = formatGuess()
         addNewGuess(formatted) //
      }

      if (key === 'Backspace') {
         setCurrentGuess(prev => prev.slice(0, -1))
         return
      }


      if (/^[A-Za-z]$/.test(key)) {
         if (currentGuess.length < 5) { //stop keyup after fifth letter
            setCurrentGuess(prev => prev + key)
         }
      }
   }





   return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, validWords, notValidWord, setNotValidWord }

}

export default useWordle;
