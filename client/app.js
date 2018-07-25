import React from 'react'

import { Navbar } from './components'
import Routes from './routes'
import Sidebar from './components/sidebar'

const App = () => {
	return (
		<div>
			<Navbar />
			<Routes />
			<Sidebar />
		</div>
	)
}

export default App
