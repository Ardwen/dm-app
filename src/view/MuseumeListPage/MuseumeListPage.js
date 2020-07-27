import React, {useEffect, useState } from 'react'
import { Table, Tag, Space } from 'antd';
import Axios from 'axios';
import { USER_SERVER } from '../../Config.js';

function MuseumeListPage(props) {

     const [MuseumeList,setMuseumeList] = useState([])

     useEffect( () => {
       Axios.get(`${USER_SERVER}/ListMuseume/${window.localStorage.getItem('username')}`)
       .then(response => {
           setMuseumeList(response.data)
       })
     },[])

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Category',
          key: 'category',
          dataIndex: 'category',
          render: category => (
                  <Tag color={'geekblue' } key={category.name}>
                    {category.name}
                  </Tag>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'id',
          render: (id) => (
            <Space size="middle">
              <a href={`/EditMuseume/${id}`}>Edit Museume</a>
              <a href={`/artItem/${id}`}>Edit ArtItem</a>
              <a >Delete</a>
            </Space>
          ),
        },
      ];

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Museume and Gallery List</h1>
            </div>
            <br />
              <Table columns={columns} dataSource={MuseumeList} />
        </div>
    )
}

export default MuseumeListPage
