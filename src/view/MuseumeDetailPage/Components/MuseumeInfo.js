import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function MuInfo(props) {

    const [Museume, setMuseume] = useState({})

    useEffect(() => {

        setMuseume(props.detail)

    }, [props.detail])

    return (
        <div>
            <Descriptions title="Museume Info">
                <Descriptions.Item label=""> {Museume.introduction}</Descriptions.Item>
                <Descriptions.Item label="Country">{Museume.country}</Descriptions.Item>
                <Descriptions.Item label="City"> {Museume.city}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                >
                   <a href= {Museume.link}>Visit Website</a>
                    </Button>
            </div>
        </div>
    )
}

export default MuInfo
