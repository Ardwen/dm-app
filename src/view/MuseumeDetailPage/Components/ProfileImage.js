import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { USER_SERVER, AWS_S3 } from '../../../Config.js';
import Axios from 'axios';

function ProfileImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
      let images = [];
      Axios.get(`${USER_SERVER}/museume/${props.detail}/muImages`)
          .then(response => {
            response.data.map(
              item => {
                  images.push({
                      original: `${AWS_S3}muSingle_small/${item.id}.jpg`,
                      thumbnail: `${AWS_S3}muSingle_middle/${item.id}.jpg`
                  })
          })
          setImages(images)})
        }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images}/>
        </div>
    )
}

export default ProfileImage
