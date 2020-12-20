import React, { Fragment } from 'react'
import { authService } from "../fbase";
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const history = useHistory()

  const onLogOutClick = () => {
    authService.signOut()
    history.push('/')
  }

  return (
    <Fragment>
      <button onClick={onLogOutClick}>Logout</button>
      <span>Profile</span>
    </Fragment>
  )
}

export default Profile
