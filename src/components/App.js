import React, { Fragment, useState, useEffect } from 'react'
import Router from 'components/Router';
import { authService } from '../fbase'

const App = () => {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setUserObj(user)
      }

      setInit(true)
    })
  })

  return (
    <Fragment>
      {init ? <Router isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'initializing'}

      {/*<footer>&copy; NWitter {new Date().getFullYear()}</footer>*/}
    </Fragment>
  )
}

export default App;
