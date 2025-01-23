import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetFetchHotelsData from '../../hooks/useGetFetchHotelsData/useGetFetchHotelsData'
import Map from '../Map/Map'
import { useHotels } from '../context/HotelsContext/HotelsContext'
import { useWallet } from '../context/WalletContext/WalletContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const headerDetailData = [
    {
        id: 1,
        name: 'Overview',
        title: 'Lorem, iepe beatae voluptatibus ipsum tempore cumque ex blanditiis, ratione corrupti dicta rem minus labore et perferendis quibusdam hic aut quis repellendus enim! Rerum delectus ipsam, illo invento.'
    },
    {
        id: 2,
        name: 'Details',
        title: 'Lorem,strum quo saepe beatae voluptatibus ipsum tempore cumque ex blanditiis, ratione corrupti dicta rem minus labore et perferendis quibusdam hic aut quis repellendus enim! Rerum delectus ipsam, illo invento.'
    },
    {
        id: 3,
        name: 'Reviews',
        title: 'Lorem, ipsum dolor siuptatibus ipsum tempore cumque ex bltiis, ratione corrupti dicta rem minus labore et perferendis quibusdam hic aut quis repellendus enim! Rerum delectus ipsam, illo invento.'
    },
]

function SingleHotel({ cbSelectedHotel }) {
    const { id } = useParams()
    const { data: hotel, isLoading } = useGetFetchHotelsData(
        `http://localhost:5000/hotels/${Number(id)}`,
        ''
    )
    const [active, setActive] = useState(1)
    const [activeImg, setActiveImg] = useState(1)
    const { hotels, isLoading: walletIsLoading, isAddToWalletLoading, addToWallet } = useWallet()
    const [isAddToWallet, setIsAddToWallet] = useState(false)

    useEffect(() => {
        cbSelectedHotel(id)
        setIsAddToWallet(hotels.find(item => item.id == hotel.id) ? true : false)
        console.log(hotels.find(item => Number(item.id) === Number(hotel.id)),id);
        
    }, [id, hotels, hotel])

    const handelAddToWallet = () => {
        addToWallet(hotel)
        setIsAddToWallet(prev => !prev)
    }


    if (hotel == undefined) return <div>Loading ...</div>

    return (
        <div className='singleHotel'>
            <div className="images">
                <div className="indexImage">
                    <img src={hotel?.picture_url?.urls[activeImg - 1].image} alt={hotel?.name} />
                </div>
                <div className="hotelImages">
                    {
                        hotel?.picture_url?.urls.map(item => (
                            <img onClick={() => setActiveImg(item?.id)} key={item?.id} src={item?.image} />
                        ))
                    }
                </div>
            </div>
            <div className="hotelDetails">
                <div className='headerSingleHotelDesc'>
                    {
                        headerDetailData.map(item => (
                            <div
                                key={item.id}
                                to={item.url}
                                className='headerSingleHotelDescLinkItem'
                                onClick={(e) => {
                                    e.preventDefault()
                                    setActive(item.id)
                                }}
                            >
                                <p className={item.id == active && 'active'}>{item.name}</p>
                                <span className={`indecator ${item.id == active && 'active'}`}></span>
                            </div>
                        ))
                    }
                </div>
                <p className="hotelDetailsTitle">{headerDetailData[active - 1].title}</p>
            </div>
            <div className="mapContainer">
                <Map />
            </div>
            {
                isAddToWallet ?
                    <p>hotel was add to wallet :)</p> :
                    <button className="addToWallet" onClick={handelAddToWallet}>{isAddToWalletLoading ? 'Loading ...' : 'Add To Wallet'}</button>
            }
        </div>
    )
}

export default SingleHotel
