import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { USER_SERVER } from '../../Config.js';

function ProfileImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
      let images = [];
      Axios.get(`${USER_SERVER}/museume/${props.detail.id}/muImages`)
          .then(response => {
            response.data.map(
              item => {
                  images.push({
                      original: `http://localhost:5000/${item.id}`,
                      thumbnail: `http://localhost:5000/${item.id}`
                  })
          })
          setImages(images)
        }
      },[props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProfileImage
