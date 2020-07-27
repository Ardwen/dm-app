import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row, Typography} from 'antd';
import { EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { getArtItems, removeArtItem} from "../../User/userAction.js";
import { useDispatch } from "react-redux";
import PopUp from "./PopUp.js"
import { USER_SERVER } from '../../Config.js';
const { Title } = Typography;
const { Meta } = Card;

function ArtItemPage(props) {
  const dispatch = useDispatch();
  const [museumeId,setmuseumeId] = useState(parseInt(props.match.params.museumeId))
  const [Museume, setMuseume] = useState()
  const [ArtItem, setArtItem] = useState([])


  useEffect(() => {
          dispatch(getArtItems(museumeId))
                .then((response) => {
                    setArtItem(response.payload)
                })
  },[])

  const HandleEdit = (id) => {
    props.history.push("/");
  }

  const HandleDelete = (artid,index) =>{
    dispatch(removeArtItem(artid))
          .then((response) => {
            var array = [...ArtItem]
            array.splice(index, 1)
            setArtItem(array)
          })
  }

  const HandleSubmit = (artItem) => {
    Axios.post(`${USER_SERVER}/ArtItems/add`,artItem)
        .then((response) => {
          setArtItem([...ArtItem,response.data])
        })
        .catch(err =>{
            console.log(err);
        })
  }

  const renderCards = ArtItem.map((artItem, index) => {
      return <Col span={12}>
          <Card
              style={{ width: 300 }}
              hoverable={true}
              cover={<img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
              actions={[
                      <EditOutlined onClick={HandleEdit} key="edit" />,
                      <DeleteOutlined onClick={HandleDelete} key="delete"/>
                      ]}>
              <Meta
                  title={artItem.name}
                  description={artItem.description}
              />
          </Card>
      </Col>
  })

  return(
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2}> Upload Art work Page</Title>
        </div>
      <PopUp onFormSubmit={HandleSubmit} museumeId={museumeId}/>
      <br/>
        {ArtItem.length === 0 ?
            <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                <h2>No post yet...</h2>
            </div> :
            <div>
                <Row gutter={[16, 16]}>

                    {renderCards}

                </Row>


            </div>
        }

    </div>
  )
}
export default ArtItemPage
