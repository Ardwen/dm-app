import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import axios from 'axios';
import Checkbox from './CheckBox.js'
import React from 'react'
import PropTypes from 'prop-types'

import React from 'react'

function uploadMuseumePage() {
  const items = [
      'One',
      'Two',
      'Three',
      ];
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [CountryValue, setCountryValue] = useState("")
    const [CityValue, setCityValue] = useState("")
    const [CategoryValue, setCategoryValue] = useState(new Set())
    const [LinkValue, setLinkValue] = useState("")

    const [Images, setImages] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onCountryChange = (event) => {
        setCountryChange(event.currentTarget.value)
    }

    const onCityChange = (event) => {
        setCityChange(event.currentTarget.value)
    }

    const onCategoryChange = (event) => {
        setCategoryChange(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  createCheckbox = (label) => (
        <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
          />
      )

  createCheckboxes = () => (
    items.map(this.createCheckbox)
  )

    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            host: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            country: PriceValue,
            city: CityValue,
            category: CategoryValue,
            link:LinkValue,
            images: Images,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Museume Successfully Set up')
                    props.history.push('/')
                } else {
                    alert('Sorry, Uploading Error')
                }
            })

    }

    return (
          <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <Title level={2}> Upload Musume Profile Page</Title>
              </div>


              <Form onSubmit={onSubmit} >

                  {/* DropZone */}
                  <FileUpload refreshFunction={updateImages} />

                  <br />
                  <br />
                  <label>Title</label>
                  <Input
                      onChange={onTitleChange}
                      value={TitleValue}
                  />
                  <br />
                  <br />
                  <label>Description</label>
                  <TextArea
                      onChange={onDescriptionChange}
                      value={DescriptionValue}
                  />
                  <br />
                  <br />

                  <label>Country</label>
                  <Input
                      onChange={onCountryChange}
                      value={CountryValue}
                  />
                  <br />
                  <br />

                  <label>City</label>
                  <Input
                      onChange={onCityChange}
                      value={CityValue}
                  />
                  <br />
                  <br />

                  <label>Price($)</label>
                  <Input
                      onChange={onPriceChange}
                      value={PriceValue}
                      type="number"
                  />
                  <br />
                  <br />

                  //<select onChange={onContinentsSelectChange} value={ContinentValue}>
                  //    {Continents.map(item => (
                  //        <option key={item.key} value={item.key}>{item.value} </option>
                  //    ))}
                  //</select>
                  {this.createCheckboxes()}
                  <br />
                  <br />

                  <Button
                      onClick={onSubmit}
                  >
                      Submit
                  </Button>

              </Form>

          </div>
      )
}

export default uploadMuseumePage
