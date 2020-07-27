import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import {Col, Card, Row, Pagination,Collapse } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from './components/ImageSlider';
import CheckBox from './components/CheckBox';
import RadioBox from './components/RadioBox';
import SearchFeature from './components/SearchFeature';
import { Dropdown } from 'semantic-ui-react'
import CountryOptions from "../../Utils/Countries";
import { USER_SERVER, AWS_S3 } from '../../Config.js';
const { Meta } = Card;
const countryOptions = CountryOptions;

const { Panel } = Collapse
function LandingPage() {

    const [Museumes, setMuseumes] = useState([])
    const [Page, setPage] = useState(1)
    const [Limit, setLimit] = useState(6)
    const [SearchTerms, setSearchTerms] = useState("")
    const [Category, setCategory] = useState([])
    const [Country, setCountry] = useState("")
    const [Categories, setCategories] = useState([])
    const [CurrentMuseume, setCurrentMuseume] = useState([])



    useEffect(() => {
        const variables = {
            cid: Category,
            country: Country,
            searchTerm: SearchTerms
        }
        Axios.get(`${USER_SERVER}/categories`)
          .then(res => {
            setCategories(res.data)
            console.log(res.data)
          })
        getMuseums(variables)
    }, [])

    const getMuseums = (variables) => {
        Axios.post(`${USER_SERVER}/getMuseum`,variables)
            .then(response => {
                if (response.status === 200) {
                    setMuseumes(response.data)
                    let elements = response.data.slice(0,Limit)
                    setCurrentMuseume(elements)
                    console.log(CurrentMuseume)
                } else {
                    alert('Failed to fectch Museume datas')
                }
            })
    }

    function onChange(pageNumber) {
      console.log('Page: ', pageNumber);
    }



    const renderCards = CurrentMuseume.map((museume, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={
                <a href={`/Museume/${museume.id}`} >
                <img
                  src={`${AWS_S3}muSingle/${museume.firstmuImage.id}.jpg`} width="160" height="145"/> /></a>
              }
            >
                <Meta
                    title={museume.name}
                    description={museume.country + ' ' + museume.city}
                />
            </Card>
        </Col>
    })


    const handleFilters = (filters) => {

      const variables = {
          cid: filters,
          country: Country,
          searchTerm: SearchTerms
      }
        setCategory(filters)
        setPage(1)
        getMuseums(variables)
    }

    const updateCountry = (event) => {
      var country = event.currentTarget.value
      const variables = {
          cid: Category,
          country: country,
          searchTerm: SearchTerms
      }
      setCountry(country)
      setPage(1)
      getMuseums(variables)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            cid: Category,
            country: Country,
            searchTerm: newSearchTerm
        }
        setPage(1)
        setSearchTerms(newSearchTerm)
        getMuseums(variables)
    }


    const handlePageClick = (pageNo) => {
      const selectedPage = pageNo - 1;
      const offset = selectedPage * Limit;
      let elements = Museumes.slice(offset,offset + Limit);
      setCurrentMuseume(elements);
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Let's Travel Anywhere  <RocketOutlined />  </h2>
            </div>


            {/* Filter  */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        list={Categories}
                        handleFilters={handleFilters}
                    />
                </Col>
                <Col lg={12} xs={24}>
                  <Collapse defaultActiveKey={['0']}>
                      <Panel header="Country" key="1">
                        <select onChange={updateCountry} value={Country}>
                              {countryOptions.map(item => (
                                  <option key={item.key} value={item.key}> {item.text}</option>
                              ))}
                        </select>
                      </Panel>
                  </Collapse>
                </Col>
            </Row>


            {/* Search  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            {CurrentMuseume.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>
                </div>
            }
            <br /><br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                defaultCurrent={1}
                onChange={handlePageClick}
                total={Museumes.length}
                pageSize={Limit}
              />
            </div>

        </div>
    )
}

export default LandingPage
