import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import { newListing } from "../actions/listings"
import { fetchTags } from "../actions/tags"

function ListingForm(props) {
  const [form, setForm] = useState({})
  const [tag, setTag] = useState(0)
  const [type, setType ] = useState(localStorage.getItem("type"))
  const [image, setImage ] = useState(null);

  const tags = props.tags;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    props.dispatch(fetchTags())
  },[]
  )

  useEffect(() => {
      if(form.type){
        setType(form.type)
      }
    }, [form]
  )

  const handleSelect = (e) => {
    setTag(e.target.value)
  }

  const handleFileSelect = (e) => {
    if (e.target.files.length === 1) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newestListing = {
      ...form,
      user_id: props.auth.user.id,
      time: new Date()
    }

    const formData = new FormData();

    formData.append("tagId", tag);
    formData.append("title", newestListing.title);
    formData.append("description", newestListing.description);
    formData.append("type", newestListing.type);
    formData.append("user_id", newestListing.user_id);
    formData.append("time", newestListing.time.toISOString());

    if (image !== null) {
      formData.append("img", image);
    }

    if (tag == 0) {
      alert("Please select a category.")
    } else if (!form.type) {
      alert("Please select either offering or looking.")
    } else if (!form.title) {
      alert("Please add a title to your post.")
    } else if(!form.description){
      alert("Please add a description to your post.")
    }

    props.dispatch(newListing(formData))

    props.history.push("/")
  }

  return (
    <div className="container add-listing-margin-top">
      <div className="add-listing-page">
        <div className="add-listing-page add-listing-center add-listing-centering">
          <h1 className="center-text">Add a Listing</h1>
          <div className="auto-margin">

            <form className="listingForm">
              <div className="auto-margin2">
                <label className="has-text-weight-bold is-size-4">Category Tags:</label>
                <select
                  className="capitalize add-listing-dropdown is-size-4 margin-bottom"
                  onChange={handleSelect}
                  name="tag"
                  defaultValue="placeholder"
                >
                  <option disabled={true} value="placeholder" hidden>
                    Select a Category...
                  </option>
                  {
                    tags.map((tag) => {
                      return (
                        <option value={tag.id} key={tag.id}>
                          {tag.tag_name}
                        </option>
                      )
                    }) // on change on the select tag, value on the option tag.
                  }
                </select>
              </div>
            </form>

            <form className="listingForm radio-buttons">
              <label className="has-text-weight-bold is-size-4">
                <input
                  onChange={handleChange}
                  className="margin-right-radio"
                  type="radio"
                  name="type"
                  value="looking"
                  checked={type == 'looking'}
                />
                  I'm looking for something...
              </label>

              <label className="has-text-weight-bold is-size-4">
                <input
                  onChange={handleChange}
                  className="margin-right-radio"
                  type="radio"
                  name="type"
                  value="offer"
                  checked={type == 'offer'}
                />
                I've got something to offer...
              </label>
            </form>
          </div>

          <form>
            <label className="listing__title has-text-weight-bold add-listing-margin is-size-4">
              Title:
            </label>
            <input
              className="input"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Listing title"
              maxLength="70"
            />
          </form>

          <form>
            <label className="listing__description has-text-weight-bold add-listing-margin is-size-4">
              Description:
            </label>
            <textarea
              className="textarea"
              type="text"
              name="description"
              onChange={handleChange}
              placeholder="Add any details of what you're seeking/offering."
            />
          </form>
          <div>Add image:
              <input className="upload_button" onChange={handleFileSelect} type='file' />
          </div>

          <div className="buttons has-addons">
            <button
              className="button is-primary is-fullwidth is-size-5"
              onClick={(e) => handleSubmit(e)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (globalState) => {
  return {
    auth: globalState.auth,
    tags: globalState.tags,
  }
}

export default connect(mapStateToProps)(ListingForm)
