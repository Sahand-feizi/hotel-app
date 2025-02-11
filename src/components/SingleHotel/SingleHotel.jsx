import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Map from '../Map/Map'
import { useDispatch, useSelector } from 'react-redux'
import { addFetchWallet } from '../../feature/wallet/walletSlice'

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

function SingleHotel({ cbSelectedHotel, hotel }) {
    const { id } = useParams()
    const [active, setActive] = useState(1)
    const [activeImg, setActiveImg] = useState(1)
    const { AddToWalletLoading, hotels } = useSelector(state => state.wallet)
    const [isAddToWallet, setIsAddToWallet] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        cbSelectedHotel(id)
    }, [id])

    useEffect(() => {
        setIsAddToWallet(hotels.find(item => item.id == hotel.id) ? true : false)
    }, [id, hotel, hotels])

    const handelAddToWallet = () => {
        dispatch(addFetchWallet(hotel))
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
                    <button className="addToWallet" onClick={handelAddToWallet}>{AddToWalletLoading ? 'Loading ...' : 'Add To Wallet'}</button>
            }
        </div>
    )
}

export default SingleHotel
