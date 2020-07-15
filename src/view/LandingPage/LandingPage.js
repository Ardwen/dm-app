import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../components/ImageSlider';
import CheckBox from './components/CheckBox';
import RadioBox from './components/RadioBox';
import {continents,price} from './components/Datas';
import SearchFeature from './components/SearchFeature';

const { Meta } = Card;

function LandingPage() {

    const [Museumes, setMuseumes] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(6)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")
    const [Category, setCategory] = useState([])
    const [Country, setCountry] = useState("")
    const [categories, setCategories] = useState(() => {
      Axios.post('/categories')
      .then(response => {
          if (response.data.success) {
              setCategories(response.data)
          } else {
              alert('Failed to fectch categories')
          }
      })
    })


    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getMuseums(variables)

    }, [])

    const getMuseums = (variables) => {
        Axios.post('/getMuseum', variables)
            .then(response => {
                if (response.data.success) {
                    setMuseumes(response.data.content)
                } else {
                    alert('Failed to fectch Museume datas')
                }
            })
    }

    //const onLoadMore = () => {
    //    let skip = Skip + Limit;

    //    const variables = {
    //        skip: Skip,
    //        limit: Limit,
    //        category: Category,
    //        country: Country,
    //        searchTerm: SearchTerms
    //  }
    //    getProducts(variables)
    //    setSkip(skip)
    //}


    const renderCards = Museumes.map((museume, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/Museume/${museume.id}`} > <ImageSlider images={product.firstmuImage} /></a>}
            >
                <Meta
                    title={museume.name}
                    description={'${museume.country}' + ' ' + '${museume.city}'}
                />
            </Card>
        </Col>
    })


    const handleFilters = (filters) => {

        const newFilters = [...Category]

        newFilters = filters

        setSkip(0)
        setCategories(newFilters)
        getProducts(variables)
    }

    const _onSelect = (country) => {
      setCountry(country)
      getMuseums(variables)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)
        getProducts(variables)
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Let's Travel Anywhere  <Icon type="rocket" />  </h2>
            </div>


            {/* Filter  */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        list={categories}
                        handleFilters={category => handleFilters(category)}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <Dropdown options={countries}
                      onChange={this._onSelect}
                      value={defaultOption}
                      placeholder="Select an option" />;
                </Col>
            </Row>


            {/* Search  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            {Products.length === 0 ?
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

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }


        </div>
    )
}

export default LandingPage
