import React, { useEffect, useState } from 'react'
import Modal from "react-modal";
import Axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { addArtItems} from "../../User/userAction.js";
import { USER_SERVER } from '../../Config.js';

function PopUp(props){
  const [Images, setImages] = useState([])
  const [Display, setDisplay] = useState(false)
  const [Name, setName] = useState("")
  const [Description, setDescription] = useState("")


  const onNameChange = (event) => {
      setName(event.currentTarget.value)
  }

  const onDescriptionChange = (event) => {
      setDescription(event.currentTarget.value)
  }

  const handleUpload = (event) => {
    let formData = new FormData();
    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    formData.append('imageFile', event.target.files[0])

    Axios.post(`${USER_SERVER}/ArtItems/add?aid=1&type=single`, formData)
        .then(response => {
                setImages([...Images, response.data.id])
        })
  }

  const handleSubmit=(event)=>{
    event.preventDefault()
    if (!Name || !Description) {
        return alert('fill all the fields first!')
    }

    const variables = {
        //host: props.user.userData._id,
        name: Name,
        description: Description,
        museumeId: museumeId,
        images: Images
    }
    console.log(variables)

    props.onFormSubmit(variables);

    modalClose();
  }

  const modalOpen=() => {
    setDisplay(true)
  }

  const modalClose=() => {
    setDisplay(false)
  }

    return (
      <div className="popup">
      <PlusOutlined
        onClick={modalOpen}
        style={{ fontSize: '3rem' }}
      />
        <Modal
          isOpen={Display}
          style={{
              overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'grey'
            },
            content: {
              position: 'absolute',
              top: '150px',
              left: '400px',
              right: '400px',
              bottom: '200px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }
          }}>
            <h2>Add Art Item</h2>
            <label>Enter Name:</label>
            <input
              type="text"
              value={Name}
              name="modalInputName"
              onChange={onNameChange}
              className="form-control"
            />
            <br/>
            <br/>
            <label>Enter Description:</label>
            <input
              type="text"
              value={Description}
              name="modalInputDescription"
              onChange={onDescriptionChange}
              className="form-control"
            />
            <br/>
            <br/>
            <div>
            <input type="file" name="uploadImage" onChange={handleUpload} />
            <button onClick={handleSubmit} type="button">
              Save
            </button>
          </div>
          <br/>
          <div>
          <button onClick={modalClose} type="button">
            close
          </button>
          </div>
        </Modal>
      </div>
    );
}
export default PopUp
