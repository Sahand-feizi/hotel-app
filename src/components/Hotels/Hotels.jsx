import React from 'react'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import useGetFetchHotelsData from '../../hooks/useGetFetchHotelsData/useGetFetchHotelsData'
import { CiLocationOn } from "react-icons/ci";
import { Link, useSearchParams } from 'react-router-dom';
import { useHotels } from '../context/HotelsContext/HotelsContext';

function Hotels({hotels, isLoading, selectedHotelData}) {

  if (isLoading && hotels == null) return <div>Loading ...</div>
  
  return (
    <div className='hotels'>
      <HeaderSearch />
      <div className="hotelsList">
        {
          hotels.map(item => (
            <Link
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              key={item.id}
              className={`hotelItem ${selectedHotelData.id == item.id && 'selectedHotel'}`}
            >
              <img className='hotelItemImg' src={item.picture_url.url} alt={item.name} />
              <p className="hotelName">{item.name}</p>
              <p className="hotelPrice">${item.price}/<span>night</span></p>
              <p className="location">
                <CiLocationOn className='icon' />
                <span>{item.host_location}</span>
              </p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Hotels
