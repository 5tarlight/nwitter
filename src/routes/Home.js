import React, { useState, useEffect } from 'react'
import { dbService, storageService } from "../fbase";
import Nweet from "../components/Nweet";
import { v4 as uuidv4 } from 'uuid'

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('')
  const [nweets, setNweets] = useState([])
  const [attachment, setAttachment] = useState()

  useEffect(() => {
    dbService.collection('nweets').onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setNweets(nweetArray)
    })
  }, [])

  const onSubmit = async event => {
    event.preventDefault()

    let attachmentURL = ''

    if(attachment !== '') {
      const attachmenteRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
      const res = await attachmenteRef.putString(attachment, 'data_url')
      attachmentURL = await res.ref.getDownloadURL()
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl: attachmentURL
    }

    await dbService.collection('nweets').add(nweetObj)
    setNweet('')
    setAttachment('')
  }

  const onChange = event => {
    const { target: { value } } = event
    setNweet(value)
  }

  const onFileChange = event => {
    const { target: { files } } = event
    const theFile = files[0]
    const reader = new FileReader()

    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent
      setAttachment(result)
    }

    reader.readAsDataURL(theFile)
  }

  const onClearAttachmentClick = () => setAttachment()

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type={'text'}
          placeholder={`What's on your mind?`}
          maxLength={120}
          required
        />
        <input type={'file'} accept={'image/*'} onChange={onFileChange}/>
        <input type={'submit'} value={'Nweet'}/>
        {attachment && <div>
          <img src={attachment} width={'50px'} height={'50px'} alt={'It seems something goes wrong :('}/>
          <button onClick={onClearAttachmentClick}>Clear</button>
        </div>}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  )
}

export default Home
