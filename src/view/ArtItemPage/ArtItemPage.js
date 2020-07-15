import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import { EditOutlined} from '@ant-design/icons';
import { getArtItems, removeArtItem} from "../../User/userAction.js";
import { useDispatch } from "react-redux";
import {PopUp} from "./component/PopUp.js"


const { Meta } = Card;

function ArtItemPage(props) {
  const museumeId = props.match.params.museumeId
  const [Museume, setMuseume] = useState()
  const [ArtItem, setArtItem] = useState([])

  useEffect(() => {
        let artItems = [];
        dispatch(getArtItems(museumeId))
              .then((response) => {
                  setArtItem(reponse.payload)
              })
    })

  function HandleEdit(id) {
    props.history.push("/login");
  }

  function HandleDelete(artid){
    dispatch(removeArtItem(artid))
          .then((response) => {
            if(response.)
          })
  }

  const renderCards = ArtItems.map((artItem, index) => {
      return <Col lg={6} md={8} xs={24}>
          <Card
              hoverable={true}
              cover={<a href={`/Museume/${museume.id}`} > <img images={product.firstmuImage} /></a>}
              actions={[
                      <EditOutlined onClick={HandleEdit(artItem.id)} key="edit" />,
                      <DeleteOutlined onClick={HandleDelete(artItem.id,index)} key="delete"/>
                      ]}>
              <Meta
                  title={artItme.name}
                  description={artItme.description}
              />
          </Card>
      </Col>
  })

  return(
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <PopUp museumeId={museumeId}/>
      <br/>
      {renderCards}

    </div>
  )


}
