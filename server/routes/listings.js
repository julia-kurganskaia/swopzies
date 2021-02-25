const express = require("express")
const db = require("../db/listings")
const router = express.Router()
const { addNewListing, getListingById, deleteById } = require("../db/listings")

module.exports = router

//Get all listings
router.get("/", (req,res) => {
  db.getListings()
    .then((listings) => {
      res.json(listings)
    })
    .catch((err) => {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong'})
  })
})

router.post("/", (req, res) => {
  let newListing = {user_id: null, type: req.body.type, title: req.body.title, description: req.body.description, image: "", time: null}
console.log(newListing)
  addNewListing(newListing)
    .then((listing) => {
      res.json(listing)
    })
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  getListingById(id)
    .then(listing => {
      res.json(listing)
    })
})

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  deleteById(id)
  // console.log(id)
    .then(() => {
      return null
    })
})