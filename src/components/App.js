import React, { Fragment, useState } from 'react'
import Router from 'components/Router';
import { authService } from '../fbase'

const App = () => {
  console.log(authService.currentUser)
  const [ isLoggedIn, setIsLoggedIn ] = useState(authService.currentUser)

  return (
    <Fragment>
      <Router isLoggedIn={isLoggedIn} />
      <footer>&copy; NWitter {new Date().getFullYear()}</footer>
    </Fragment>
  )
}

export default App;
