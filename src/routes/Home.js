import React, { useState, useEffect } from 'react'
import { dbService } from "../fbase";

const Home = () => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])

  const getNweets = async () => {
    const nwts = await dbService.collection('nweets').get()
    nwts.forEach(doc => {
      const nweetObject = {
        ...doc.data(),
        id: doc.id
      }
      setNweets(prev => [nweetObject, ...prev])
    })
  }

  useEffect(() => {
    getNweets()
  }, [])

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

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type={'text'} placeholder={`What's on your mind?`} maxLength={120}/>
        <input type={'submit'} value={'Nweet'}/>
      </form>
      <div>
        {nweets.map((nweet, i) => (
          <div key={i}>
            <h4>{nweet.nweet}</h4>
          </div>

        ))}
      </div>
    </div>
  )
}

export default Home
