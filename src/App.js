import {useEffect, useState} from 'react';
import fruitItems from "./fruits.json"
import './App.css';


function Card({ fruit, flipped, chooseCard }) {
  const cardClickHandle = (e) => {
    chooseCard(fruit)
  }

   return  <div className={`card ${flipped ? 'matched' : ''}`} onClick={cardClickHandle} >
    <img style={{transform: 'rotateY(180deg)'}} src={fruit.src} />
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"></path>
      <line x1="12" y1="19" x2="12" y2="19.01"></line>
    </svg>
   </div>
}

function App() {

  const [fruits, setFruits] = useState([])
  const [fruitOne, setFruitOne] = useState(null)
  const [fruitTwo, setFruitTwo] = useState(null)
  // const [fruitOne, setFruitOne] = useState(null)

  const initGame = () => {
    const allFruits = [...fruitItems, ...fruitItems]
    .sort(()=> Math.random() - .5 )
    .map(item => ({...item, id: Math.random() }))

    setFruits(allFruits)
  }
  
  const resetGame = () => {
    setFruits(prevFruits =>{
      return prevFruits.map(item => {
        if(item.matched){
          return {...item, matched: false}
        }

        return item
       })
    })

    setFruitOne(null)
    setFruitTwo(null)

    setTimeout(() =>{
      initGame()
    }, 500)
  }

  const chooseCard = (fruit) => {
    fruitOne ? setFruitTwo(fruit) : setFruitOne(fruit)
  }

  useEffect(() =>  {
    if(fruitOne && fruitTwo) {
      if(fruitOne.src === fruitTwo.src){
        setFruits(prevFruits => {
          return prevFruits.map(item => {
             if(item.src === fruitOne.src){
               return {...item, matched: true }
             }else{
               return item
             }
          })
        })
      }

      setTimeout(() =>{
          setFruitOne(null)
          setFruitTwo(null)
      }, 500)
    }
  }, [fruitOne, fruitTwo])

  return <>
      <h1> Memory Game </h1>
      {
        fruits.length ? <>
          <button onClick={resetGame} className='reset'>
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
           </svg>
          </button>
          <div className='game-block'>
            {
               fruits.map((fruit, key) =>{
                  return <Card 
                  key = {key}
                  
                    chooseCard={chooseCard}
                    flipped={fruit === fruitOne || fruit === fruitTwo || fruit.matched}
                    fruit={fruit}
                    />
               })
            }
          </div>
        </> : <button  onClick={initGame} className='start-game'>Start Game</button>
      }
    </>
  
}

export default App;
