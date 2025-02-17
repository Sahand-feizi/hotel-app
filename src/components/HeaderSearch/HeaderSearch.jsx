import React, { forwardRef, useRef, useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { FaMinus, FaPlus } from "react-icons/fa6";
import useOutsideClick from '../../hooks/useOutsideClick/useOutsideClick';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';

function HeaderSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const room = JSON.parse(searchParams.get('options'))?.room;
  const destinationSearchParams = searchParams.get('destination')
  const [isOpenDate, setIsOpenDate] = useState(false)
  const [date, setDate] = useState(
    [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]
  )
  const [options, setOptions] = useState({ adoult: 1, children: 0, room: room || 1 })
  const [isShowOptions, setIsShowOptions] = useState(false)
  const [price, setPrice] = useState({ min: 0, max: 0 })
  const [isOpenPrice, setIsOpenPrice] = useState(false)
  const [destination, setDestination] = useState(destinationSearchParams || '')

  const handelOptions = (type, operaition) => {
    if (operaition == 'inc') {
      setOptions(prev => {
        return {
          ...prev,
          [type]: prev[type] + 1
        }
      })
    } else {
      setOptions(prev => {
        return {
          ...prev,
          [type]: prev[type] - 1
        }
      })
    }
  }

  const handelOptionsPrice = (type, operaition) => {

    if (operaition == 'inc') {
      setPrice(prev => {
        return {
          ...prev,
          [type]: prev[type] + 100
        }
      })
    } else {
      setPrice(prev => {
        return {
          ...prev,
          [type]: prev[type] - 100
        }
      })
    }
  }

  const hanlerSearch = (e) => {
    e.preventDefault()
    const createSearch = createSearchParams({
      options: JSON.stringify(options),
      destination: destination,
      date: JSON.stringify(date)
    })

    setSearchParams(createSearch)
  }

  return (

    <div className='hotelsHeader'>
      <div className="headerSearch">
        <div className='hotelFilterSearchListContainer'>
          <div className="hotelFilterSearchList">
            <div className="hotelFilterSearchItem">
              <div className="hotelFilterSearchItemContainer">
                <div id='exiptionsIdPrice' onClick={() => setIsOpenPrice(prev => !prev)}>
                  <p id='exiptionsIdPrice'>Price</p>
                  <span id='exiptionsIdPrice'>200$ to 400$</span>
                </div>
                <IoIosArrowDown className='icon' />
              </div>
              {
                isOpenPrice &&
                <GuestOptionsPriceList
                  options={price}
                  handelOptions={handelOptionsPrice}
                  handelClose={() => setIsOpenPrice(false)}
                />
              }
            </div>
            <div className="hotelFilterSearchItem">
              <div className="hotelFilterSearchItemContainer">
                <div id='exiptionsIdOptions' onClick={() => setIsShowOptions(prev => !prev)}>
                  <p id='exiptionsIdOptions'>Information</p>
                  <span id='exiptionsIdOptions'>1 adoult, ...</span>
                </div>
                <IoIosArrowDown className='icon' />
              </div>
              {
                isShowOptions &&
                <GuestOptionsList
                  options={options}
                  handelOptions={handelOptions}
                  handelClose={() => setIsShowOptions(false)}
                />
              }
            </div>
            <div className="hotelFilterSearchItem">
              <div className="hotelFilterSearchItemContainer">
                <div onClick={() => setIsOpenDate(prev => !prev)}>
                  <p>Date</p>
                  <span>{format(date[0].startDate, 'MM/dd')} to {format(date[0].endDate, 'MM/dd')}</span>
                </div>
                <IoIosArrowDown className='icon' />
              </div>
              {
                isOpenDate &&
                <DateRange
                  className='date'
                  ranges={date}
                  onChange={item => setDate([item.selection])}
                  minDate={new Date()}
                  moveRangeOnFirstSelection={true}
                  rangeColors={['#1ec28b', '#1ec28b', '#1ec28b']}
                />
              }

            </div>
          </div>
          <button className='searchButton' onClick={hanlerSearch}>
            <LuSearch />
          </button>
        </div>
        <div className="destination">
          <div className="searchIconContainer"><LuSearch /></div>
          <input
            type="text"
            placeholder='Search Hotel ...'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>
    </div>

  )
}

export default HeaderSearch

function GuestOptionsList({ options, handelOptions, handelClose }) {
  const optionsRef = useRef()
  useOutsideClick(optionsRef, 'exiptionsIdOptions', handelClose)
  return (
    <div className="gustOptionsList" ref={optionsRef}>
      <GuestOptionsItem handelOptions={handelOptions} options={options} type='adoult' minLimit={1} />
      <GuestOptionsItem handelOptions={handelOptions} options={options} type='children' minLimit={0} />
      <GuestOptionsItem handelOptions={handelOptions} options={options} type='room' minLimit={1} />
    </div>
  )
}

function GuestOptionsPriceList({ options, handelOptions, handelClose }) {
  const priceRef = useRef()
  useOutsideClick(priceRef, 'exiptionsIdPrice', handelClose)
  return (
    <div className="gustOptionsListPrice" ref={priceRef}>
      <GuestOptionsItem handelOptions={handelOptions} options={options} type='min' minLimit={0} />
      <GuestOptionsItem handelOptions={handelOptions} options={options} type='max' minLimit={0} />
    </div>
  )
}

function GuestOptionsItem({ options, type, minLimit, handelOptions }) {
  return (
    <div className='guestOptionsItem'>
      <p>{type}</p>
      <div className="guestOptionsItemButtons">
        <button
          className="minus"
          disabled={options[type] <= minLimit}
          onClick={() => handelOptions(type, 'dec')}
        ><FaMinus /></button>
        <p>{options[type]}</p>
        <button className="plus" onClick={() => handelOptions(type, 'inc')}><FaPlus /></button>
      </div>
    </div>
  )
}