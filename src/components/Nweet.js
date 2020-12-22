import React, { useState } from 'react'
import { dbService } from "../fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want delete this nweet?')

    if (ok) {
      await dbService.doc('nweets/' + nweetObj.id).delete()
    }
  }

  const toggleEditing = () => setEditing(prev => !prev)
  const onSubmit = async event => {
    event.preventDefault()
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet
    })
    setEditing(false)
  }
  const onChange = event => {
    const { target: { value } } = event
    setNewNweet(value)
  }

  return (
    <div>
      {
        editing ?
          <>
            <form onSubmit={onSubmit}>
              <input
                type={'text'}
                placeholder={'Edit your nweet'}
                value={newNweet}
                onChange={onChange}
                required
              />
              <input type={'submit'} value={'Edit'}/>
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
          :
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl &&
            <img
              src={nweetObj.attachmentUrl}
              width={'50px'} height={'50px'}
              alt={'Cannot fetch file'}
            />}
            {isOwner && <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>}
          </>
      }
    </div>
  )
}

export default Nweet
