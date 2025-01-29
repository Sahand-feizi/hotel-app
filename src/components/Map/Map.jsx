import React, { useEffect, useState } from 'react'
import { useHotels } from '../context/HotelsContext/HotelsContext'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Map({ className= '' }) {
    const { hotels, isLoading } = useHotels()
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const [selectedHotelLocation, setSelectedHotelLocation] = useState([lat || 50, lng || 35])

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
            className={`map ${className}`}
        >
            <ChangeCenter position={selectedHotelLocation} />
            <DetectClick />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                hotels.map(item => (
                    <Marker key={item.id} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.name}
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    )
}

export default Map

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick(){
    const navigate = useNavigate()
    useMapEvent({
        click:(e) => navigate(`/addNewHotel/${Date.now()}?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
    return null
}