import React from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

function App() {

  return (
    <React.Fragment>
      <main className='flex'>
        <Sidebar />
        <Main />
      </main>
    </React.Fragment>
  )
}

export default App;
