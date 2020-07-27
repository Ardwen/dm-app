import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col, Card} from 'antd';
import ProfileImage from './Components/ProfileImage.js';
import MuInfo from './Components/MuseumeInfo.js';
import { USER_SERVER,AWS_S3 } from '../../Config.js';
const { Meta } = Card;


function DetailMuseumePage(props) {
    const museumeId = parseInt(props.match.params.museumeId);
    const [Museume, setMuseume] = useState([]);
    const [ArtItem, setArtItem] = useState([]);

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
                cover= {<img src = {`${AWS_S3}artSingle${artItem.firstArtImage.id}.jpg`} />
            }>
                <Meta
                    title={artItem.name}
                    description={artItem.description}
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
                    <ProfileImage detail={museumeId} />
                </Col>
                <Col lg={12} xs={24}>
                    <MuInfo
                        detail={Museume} />
                </Col>
            </Row>

            <Row gutter={[16, 16]}>

                {renderCards}

            </Row>
        </div>
    )
}

export default DetailMuseumePage
