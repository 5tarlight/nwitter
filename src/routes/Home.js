import React, { useState } from 'react'
import { dbService } from "../fbase";

const Home = () => {
  const [nweet, setNweet] = useState('')
  const onSubmit = async event => {
    event.preventDefault()
    if (nweet === '') return

    await dbService.collection('nweets').add({
      nweet: nweet,
      createdAt: Date.now()
    })
    setNweet('')
  }

  const onChange = event => {
    const { target: { value } } = event
    setNweet(value)
  }

  return (<div>
    <form onSubmit={onSubmit}>
      <input value={nweet} onChange={onChange} type={'text'} placeholder={`What's on your mind?`} maxLength={120}/>
      <input type={'submit'} value={'Nweet'}/>
    </form>
  </div>)
}

export default Home
