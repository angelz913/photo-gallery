import React from 'react'
import Photo from './Photo'

const Photos = ({ photos, onHoverImage, onToggleDetails, onClickDelete }) => {
    return (
        <>
            {photos.map(photo => {
                return <Photo key={photo.id} 
                            photo={photo} 
                            onHoverImage={onHoverImage} 
                            onToggleDetails={onToggleDetails} 
                            onClickDelete={onClickDelete}/>
            })}
        </>
    )
}

export default Photos
