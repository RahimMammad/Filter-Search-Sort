import { useState } from 'react'
import List from './assets/components/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <List/>
    </>
  )
}

export default App
