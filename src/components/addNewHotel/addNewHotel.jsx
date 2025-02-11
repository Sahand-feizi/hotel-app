import React, { useEffect, useState } from 'react'
import Map from '../Map/Map'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addFetchHotel } from '../../feature/hotels/hotelsSlice'

const BASE_URL = 'https://api-bdc.net/data/reverse-geocode-client'

function AddNewHotel() {

    const { id } = useParams()
    const [imagesUrl, setImagesUrl] = useState([{ id: 1, image: '/images/no image.jpg' }, { id: 2, image: '/images/no image.jpg' }, { id: 3, image: '/images/no image.jpg' }])
    const [selectedUrlImage, setSelectedUrlImage] = useState(null)
    const [cityName, setCityName] = useState(null)
    const [countryName, setCountryName] = useState(null)
    const [hotelName, setHotelName] = useState('')
    const [hotelPrice, setHotelPrice] = useState(1)
    const [hotelNumber, setHotelNumber] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPost, setIsLoadingPost] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const dispatch = useDispatch()

    const handelImageUrl = (selectedImage, url) => {
        setImagesUrl([...imagesUrl].map(imageUrl => imageUrl.id === selectedImage ? { ...imageUrl, image: url } : imageUrl))
    }

    const getLocationData = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
            setCityName(data.city)
            setCountryName(data.countryName)
        } catch (error) {
            toast.error(error?.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (lat && lng) {
            getLocationData()
        }
    }, [lat, lng])

    const handelAddHotel = async () => {
        dispatch(addFetchHotel({
            "id": id,
            "listing_url": "https://www.airbnb.com/rooms/9690677",
            "scrape_id": "20170402075052",
            "last_scraped": "2017-04-02",
            "name": hotelName,
            "summary": "Spacious and bright apartment with welcoming living room, well equipped kitchen with pretty garden view, a superspacious bathroom and two comfortable double bedrooms. 10 min bike ride to city centre (f.e. Dam Square/Anne Frank House).",
            "space": "I have no reviews yet as this is the first time I will rent out my apartment. So I'm excited about starting this :)!",
            "description": "Spacious and bright apartment with welcoming living room, well equipped kitchen with pretty garden view, a superspacious bathroom and two comfortable double bedrooms. 10 min bike ride to city centre (f.e. Dam Square/Anne Frank House). If you need any help during your stay, whether organising your public transport to the airport or finding a great local place to have dinner, I'm happy to help. De Baarsjes is a young and creative neighborhood which has become more and more popular over the past few years. I love it for the great mix of people -every age group and background is represented-, and the local public amenities reflect that variety. You will find cheap local grocery stores and a brand new mosque alongside beautiful design stores and great coffee places. To reach my house from Central Station, you catch tram 13 (direction Geuzenveld) to tramstop Admiraal de Ruyterweg, which takes approximately 12 minutes. From there, it's a 5 minute walk to my house.  To reach my house from Schi",
            "experiences_offered": "none",
            "neighborhood_overview": "De Baarsjes is a young and creative neighborhood which has become more and more popular over the past few years. I love it for the great mix of people -every age group and background is represented-, and the local public amenities reflect that variety. You will find cheap local grocery stores and a brand new mosque alongside beautiful design stores and great coffee places.",
            "notes": null,
            "transit": "To reach my house from Central Station, you catch tram 13 (direction Geuzenveld) to tramstop Admiraal de Ruyterweg, which takes approximately 12 minutes. From there, it's a 5 minute walk to my house.  To reach my house from Schiphol, you catch a train to Amsterdam Lelylaan (7 mins) and take tram 17 (direction Centraal Station) to tramstop 'Witte de Withstraat' (6 mins). From the tramstop, it's a 5 min walk to my house. If you're travelling by car, there's usually plenty of space to park in front of or nearby the house. There's paid parking (2,40/hour) from Monday til Saturday 09h-24h. You can reach the city center (f.e. Dam Square) by foot in about 30 minutes. If you'd rather explore the city the way the locals do -by bike!- there's several bike rental shops closeby.",
            "access": "As a guest, you have access to the living room, kitchen, bathroom, toilet, laundry room and balcony. Mi casa es su casa.",
            "interaction": "If you need any help during your stay, whether organising your public transport to the airport or finding a great local place to have dinner, I'm happy to help.",
            "house_rules": "No pets allowed, no smoking in the house, but feel free to smoke on the balcony. As I live in a quiet street, this is not a place for partying in the house.",
            "thumbnail_url": null,
            "medium_url": null,
            "picture_url": {
                "thumbnail": true,
                "filename": "f3f1d071-cff4-42af-bfe9-c9c3504a45d6.jpg",
                "format": "JPEG",
                "width": 639,
                "mimetype": "image/jpeg",
                "id": "2e202e79e908a132d144cc32168fcfc3",
                "last_synchronized": "2019-07-03T11:10:24.139947",
                "color_summary": [
                    "rgba(221, 221, 210, 1.00)",
                    "rgba(192, 197, 185, 1.00)",
                    "rgba(155, 151, 136, 1.00)"
                ],
                "height": 426,
                "url": "https://media.istockphoto.com/id/155375440/photo/singapore-raffles-historic-colonial-landmark.jpg?s=612x612&w=0&k=20&c=kxIggXkXA6MEuWYiandYtOwRG5dUZx5APxPPLHx7nnM=",
                "urls": [
                    {
                        "id": 1,
                        "image": imagesUrl[0].image
                    },
                    {
                        "id": 2,
                        "image": imagesUrl[1].image
                    },
                    {
                        "id": 3,
                        "image": imagesUrl[2].image
                    }
                ]
            },
            "xl_picture_url": null,
            "host_id": "40565986",
            "host_url": "https://www.airbnb.com/users/show/40565986",
            "host_name": "Claudia",
            "host_since": "2015-08-05",
            "host_location": `${cityName}, ${countryName}`,
            "host_about": "Live in lovely Amsterdam. Work in art education. Love to travel!",
            "host_response_time": null,
            "host_response_rate": null,
            "host_acceptance_rate": null,
            "host_thumbnail_url": "https://a0.muscache.com/im/pictures/498546fb-5b6f-4523-9d0c-8cd1500fd8e8.jpg?aki_policy=profile_small",
            "host_picture_url": "https://a0.muscache.com/im/pictures/498546fb-5b6f-4523-9d0c-8cd1500fd8e8.jpg?aki_policy=profile_x_medium",
            "host_neighbourhood": "Oud-West",
            "host_listings_count": 2,
            "host_total_listings_count": 2,
            "host_verifications": [
                "email",
                "phone",
                "reviews",
                "jumio"
            ],
            "street": "Oud-West, Amsterdam, Noord-Holland 1057, Netherlands",
            "neighbourhood": "Oud-West",
            "neighbourhood_cleansed": "De Baarsjes - Oud-West",
            "neighbourhood_group_cleansed": null,
            "city": "Amsterdam",
            "state": "Noord-Holland",
            "zipcode": "1057",
            "market": "Amsterdam",
            "smart_location": "Amsterdam, Netherlands",
            "country_code": "NL",
            "country": "Netherlands",
            "latitude": lat,
            "longitude": lng,
            "property_type": "Apartment",
            "room_type": "Entire home/apt",
            "accommodates": hotelNumber,
            "bathrooms": 1,
            "bedrooms": 2,
            "beds": 2,
            "bed_type": "Real Bed",
            "amenities": [
                "TV",
                "Internet",
                "Wireless Internet",
                "Kitchen",
                "Heating",
                "Family/kid friendly",
                "Washer",
                "Smoke detector",
                "First aid kit",
                "Essentials",
                "Shampoo",
                "Hangers",
                "Hair dryer",
                "Iron",
                "Laptop friendly workspace"
            ],
            "square_feet": null,
            "price": hotelPrice,
            "weekly_price": null,
            "monthly_price": null,
            "security_deposit": null,
            "cleaning_fee": 50,
            "guests_included": 1,
            "extra_people": 0,
            "minimum_nights": 1,
            "maximum_nights": 1125,
            "calendar_updated": "3 months ago",
            "has_availability": null,
            "availability_30": 0,
            "availability_60": 0,
            "availability_90": 0,
            "availability_365": 0,
            "calendar_last_scraped": "2017-04-02",
            "number_of_reviews": 2,
            "first_review": "2015-12-27",
            "last_review": "2016-01-17",
            "review_scores_rating": 100,
            "review_scores_accuracy": 10,
            "review_scores_cleanliness": 10,
            "review_scores_checkin": 10,
            "review_scores_communication": 10,
            "review_scores_location": 9,
            "review_scores_value": 10,
            "license": null,
            "jurisdiction_names": "Amsterdam",
            "cancellation_policy": "moderate",
            "calculated_host_listings_count": 2,
            "reviews_per_month": 0.13,
            "geolocation": {
                "lon": 4.861157573506015,
                "lat": 52.368466776562
            },
            "features": [
                "Host Is Superhost",
                "Host Has Profile Pic",
                "Host Identity Verified",
                "Is Location Exact"
            ]
        }))
    }

    return (
        <>
            <div className='addNewHotel'>
                <div className="images">
                    <div className="indexImage indexImageAddHotel">
                        <img src={imagesUrl[0].image} />
                    </div>
                    <div className="hotelImages hotelImagesAddHotel">
                        {
                            imagesUrl.map((item) => (
                                <img src={item.image} onClick={() => setSelectedUrlImage(item.id)} />
                            ))
                        }
                        {selectedUrlImage && <AddUrlImage cb={() => setSelectedUrlImage(null)} handelImageUrl={handelImageUrl} imageIndex={selectedUrlImage} />}
                    </div>
                </div>
                <form>
                    <input
                        type="text"
                        placeholder='Name ...'
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Address ...'
                        value={`${cityName}, ${countryName}`}
                    />
                    <div>
                        <input
                            type="number"
                            value={hotelPrice}
                            onChange={(e) => setHotelPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            value={hotelNumber}
                            onChange={(e) => setHotelNumber(e.target.value)}
                        />
                    </div>
                    <button onClick={handelAddHotel}>{isLoadingPost ? 'Loading ...' : 'Add New Hotel'}</button>
                </form>
            </div>
            <Map />
        </>
    )
}

export default AddNewHotel

function AddUrlImage({ cb, imageIndex, handelImageUrl }) {
    const [imageUrlText, setImagesUrlText] = useState('')
    const [errorUrlText, setErrorUrlText] = useState(false)

    const handelAddUrl = () => {
        if (!imageUrlText) {
            setErrorUrlText(true)
            return null
        }

        handelImageUrl(imageIndex, imageUrlText)
        cb()
    }

    return (
        <div className='addUrlImageContainer'>
            <div className="addUrlImage">
                <input
                    type="text"
                    placeholder='Image url ...'
                    value={imageUrlText}
                    onChange={(e) => setImagesUrlText(e.target.value)}
                />
                <button onClick={handelAddUrl}>Add</button>
            </div>
        </div>
    )
}