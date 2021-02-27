import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { postNewComment } from '../apis/comms'

const Comms = (props) => {
  const listing_id = props.listingId
  const user_id = props.auth.user.id

  const [comment, setComment] = useState('')
  

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {
      listing_id,
      user_id,
      text: comment,
      time: new Date()
    } 
    postNewComment(newComment)
  } 

  return (

    <div className='thread' >
      <form className='message' onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} />
        <input type='submit' />
      </form>
    </div>
  )


} 

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth
  }
}

export default connect(mapStateToProps)(Comms)