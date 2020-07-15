import React, { useEffect, useState } from 'react'
import Modal from "./Modal";

function PopUp(props){
  const [Images, setImages] = useState([])
  const [Display, setDisplay] = useState(false)
  const [Name, setName] = useState("")
  const [Description, setDescription] = useState("")


  const onNameChange = (event) => {
      setTitleValue(event.currentTarget.value)
  }

  const onDescriptionChange = (event) => {
      setDescriptionValue(event.currentTarget.value)
  }

  handleSubmit(e) {
    event.preventDefault();
    if (!Name || !Description) {
        return alert('fill all the fields first!')
    }

    const variables = {
        //host: props.user.userData._id,
        name: Name,
        intro: Description,
        museume: props.museumeId
        images: Images
    }
    this.setState({ name: this.state.modalInputName });
    this.modalClose();
  }

  modalOpen() {
    setDisplay(true)
  }

  modalClose() {
    setDisplay(false)
  }

    return (
      <div className="popup">
        <a href="javascript:;" onClick={modalOpen}>
          Add new Art Work
        </a>
        <Modal show={this.Display} handleClose={modalClose()}>
          <div className="form-group">
            <label>Enter Name:</label>
            <input
              type="text"
              value={this.Name}
              name="modalInputName"
              onChange={onNameChange}
              className="form-control"
            />
            <br/>
            <label>Enter Description:</label>
            <input
              type="text"
              value={this.Description}
              name="modalInputDescription"
              onChange={onDescriptionChange}
              className="form-control"
            />
            <br/>
          </div>
          <div className="form-group">
            <button onClick={e => this.handleSubmit(e)} type="button">
              Save
            </button>
          </div>
        </Modal>
      </div>
    );
}
export default PopUp
