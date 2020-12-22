import React, { Fragment, useEffect } from 'react'
import { authService, dbService } from "../fbase";
import { useHistory } from 'react-router-dom'

const Profile = ({ userObj }) => {
  const history = useHistory()

  const onLogOutClick = () => {
    authService.signOut()
    history.push('/')
  }

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get()

    console.log(nweets.docs.map(doc => doc.data()))
  }

  useEffect(() => {
    getMyNweets()
  }, [])

  return (
    <Fragment>
      <button onClick={onLogOutClick}>Logout</button>
      <span>Profile</span>
    </Fragment>
  )
}

export default Profile
