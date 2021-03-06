const express = require("express")
const router = express.Router()

const { 
        addNewComm, 
        getCommsForListing,
        addThreadId
       } = require('../db/comms')

router.get('/:listingId', (req, res) => {
  const listingId = req.params.listingId
  getCommsForListing(listingId)
    .then(comms => {
      res.json(comms)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/', (req, res) => {
  const newComm = req.body
  addNewComm(newComm)
    .then(commId => {
      addThreadId(commId)
      .then(() => {
        res.sendStatus(200)
        return null
      })
    })
})

router.post('/blah', (req, res) => {
  const newComm = req.body
  addNewComm(newComm)
    .then(() => {
      res.sendStatus(200)
      return null
    })
})


module.exports = router