import React, { Fragment, useState, useEffect } from 'react'
import Router from 'components/Router';
import { authService } from '../fbase'

const App = () => {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }

      setInit(true)
    })
  })

  return (
    <Fragment>
      {init ? <Router isLoggedIn={isLoggedIn}/> : 'initializing'}

      <footer>&copy; NWitter {new Date().getFullYear()}</footer>
    </Fragment>
  )
}

export default App;
