import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Map({ style = '', hotels, isLoading }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const [selectedHotelLocation, setSelectedHotelLocation] = useState([lat || 35, lng || 35])
    console.log(hotels);

    useEffect(() => {
        if (lat && lng) {
            setSelectedHotelLocation([lat, lng])
        }
    }, [lat, lng])

    if (isLoading) return <div>Loading ...</div>

    return (
        <MapContainer
            center={selectedHotelLocation}
            zoom={13}
            scrollWheelZoom={true}
            className={`map ${style}`}
        >
            <ChangeCenter position={selectedHotelLocation} />
            <DetectClick />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                hotels?.map(item => (
                    <Marker key={item.id} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.name}
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    )
    // const position = [51.505, -0.09]

    // return(
    //     <MapContainer center={position} zoom={13} scrollWheelZoom={true} className='map'>
    //         <TileLayer
    //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         />
    //         <Marker position={position}>
    //             <Popup>
    //                 A pretty CSS3 popup. <br /> Easily customizable.
    //             </Popup>
    //         </Marker>
    //     </MapContainer>
    // )
}

export default Map

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick() {
    const navigate = useNavigate()
    useMapEvent({
        click: (e) => navigate(`/addNewHotel/${Date.now()}?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
    return null
}