import React, { useEffect } from "react"
import { connect } from "react-redux"
import { fetchListings } from "../actions/listings"

import Comms from "./Comms"

function Listing(props) {
  useEffect(() => {
    props.dispatch(fetchListings())
  }, [])

  const listingId = props.match.params.id

  return (
    <div className="container">
      {props.listings.map((listingItem) => {
        if (listingItem.id == listingId) {
          console.log("here!")
          return (
            <div key={listingItem.id}>
              <p>{listingItem.title}</p>
              <p>{listingItem.description}</p>
              <p>
                <img src={listingItem.img} />
              </p>
              <Comms listingId={listingItem.id} />
            </div>
          )
        }
      })}
    </div>
  )
}

const mapStateToProps = (globalState) => {
  return {
    listings: globalState.listings,
  }
}

export default connect(mapStateToProps)(Listing)
