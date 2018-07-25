import React from 'react'


import { Navbar, Footer } from './components'
import Routes from './routes'
import Sidebar from './components/sidebar'

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes />
    <Sidebar />
      <Footer />
    </div>
  )
}

export default App
