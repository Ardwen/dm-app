import React, {useEffect, useState } from 'react'
import { Typography, Button, Form, Input} from 'antd';
import Axios from 'axios';
import CountryOptions from "../../Utils/Countries";
import FileUpload from './FileUpload'
import { USER_SERVER } from '../../Config.js';

const { Title } = Typography;
const { TextArea } = Input;
const countryOptions = CountryOptions;


function MuseumeEditPage(props) {

    const museumeId = parseInt(props.match.params.museumeId);
    const [Museume, setMuseume] = useState()
    const [TitleValue, setTitleValue] = useState()
    const [DescriptionValue, setDescriptionValue] = useState()
    const [CountryValue, setCountryValue] = useState()
    const [CityValue, setCityValue] = useState()
    const [CategoryValue, setCategoryValue] = useState(parseInt(props.Museume.category.id))
    const [LinkValue, setLinkValue] = useState(props.Museume.link)

    const [Images, setImages] = useState([])

    const [categories,setcategories] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onCountryChange= (event) => {
      setCountryValue(event.currentTarget.value)
    }

    const onCityChange = (event) => {
        setCityValue(event.currentTarget.value)
    }

    const onCategoryChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }

    const updateImages = (newImagesId) => {
        var id = parseInt(newImagesId);
        setImages([...Images,id]);
    }

    const onLinkChange = (event) => {
        setLinkValue(event.currentTarget.value)
    }

    useEffect(() => {
      Axios.get(`${USER_SERVER}/categories`)
        .then(res => {
          setcategories(res.data)
        })
      Axios.get(`${USER_SERVER}/Museume/${museumeId}`)
          .then(res => {
            setMuseume(res.data)
          })

      setCategoryValue(Museume.category.id);
      setTitleValue(Museume.name);
      setCityValue(Museume.city);
      setCountryValue(Museume.country);
      set
    },[])



    const onSubmit = (event) => {

        if (!TitleValue || !DescriptionValue || !CountryValue ||
            !CityValue || !CategoryValue || !LinkValue) {
            return alert('fill all the fields first!')
        }

        const variables = {
            //host: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            country: CountryValue,
            city: CityValue,
            category: CategoryValue,
            link:LinkValue,
            images: Images
        }
        console.log(variables);

        Axios.post(`${USER_SERVER}/EditMuseume/${Museume.id}`, variables)
            .then(response => {
              if (response.status === 200) {
                    alert('Museume Successfully updated')
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
                  <FileUpload refreshFunction={updateImages} id={Museume.id}/>

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
                  <select onChange={onCountryChange} value={CountryValue}>
                        {countryOptions.map(item => (
                            <option key={item.key} value={item.text}> {item.text}</option>
                        ))}
                  </select>
                  <br />
                  <br />


                  <label>City</label>
                  <Input
                      onChange={onCityChange}
                      value={CityValue}
                  />
                  <br />
                  <br />

                  <label>Link</label>
                    <Input
                        onChange={onLinkChange}
                        value={LinkValue}
                    />
                  <br />
                  <br />

                  <label>Category</label>
                  <select onChange={onCategoryChange} value={CategoryValue}>
                      {categories.map(item => (
                          <option key={item.id} value={item.id}> {item.name}</option>
                      ))}
                  </select>
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

export default MuseumeEditPage;
