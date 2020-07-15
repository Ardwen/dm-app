import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import ProfileImage from './Components/ProfileImage.js';
import MusemeInfo from './Components/MuseumeInfo.js';
import { USER_SERVER } from '../Config.js';

function DetailMuseumePage(props) {
    const dispatch = useDispatch();
    const museumeId = props.match.params.museumeId
    const [Museume, setMuseume] = useState([])
    const [ArtItems, setArtItem] = useState([])

    useEffect(() => {
        Axios.get(`${USER_SERVER}/Museume/${museumeId}`)
            .then(response => {
                setMuseume(response.data)
            })
        Axios.get(`${USER_SERVER}/Museume/${museumeId}/arts`)
            .then(response => {
                setArtItem(response.data)
            })
    }, [])

    const renderCards = ArtItem.map((artItem, index) => {
        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/Museume/${museume.id}`} > <img images={product.firstmuImage} /></a>}
                <Meta
                    title={artItme.name}
                    description={artItme.description}
                />
            </Card>
        </Col>
    })

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Museume.name}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <ProfileImage detail={Museume} />
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo
                        detail={Product} />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>

                {renderCards}

            </Row>
        </div>
    )
}

export default DetailProductPage
