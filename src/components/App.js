import React, { useState, useEffect } from 'react'
import Header from './Header'
import Photos from './Photos'
import Upload from './Upload'
import ConfirmDelete from './ConfirmDelete'

const App = () => {

    const [photos, setPhotos] = useState([])
    const [tags, setTags] = useState([])
    const [id, setId] = useState(0) 

    // Fetch photos from server
    const fetchPhotos = async () => {
        const response = await fetch("http://localhost:5000/photos")
        const data = await response.json()
        return data
    }

    // Filter 
    const filterPhotos = tagButton => {
        const filterPhotosHelper = async () => {
            // Get photos from server
            const photoList = await fetchPhotos()
            if (tagButton.classList.contains("active")) {
                tagButton.classList.remove("active")
                setPhotos(photoList)
            } else {
                const tag = tagButton.innerHTML
                const newPhotos = photoList.filter(photo => {
                    return photo.tags.includes(tag)
                })
                const tagButtons = document.getElementsByClassName("tagBtn")
                for (let i = 0; i < tagButtons.length; i++) {
                    tagButtons[i].classList.remove("active")
                }
                tagButton.classList.add("active")
                setPhotos(newPhotos)
            }
        }
        filterPhotosHelper()        
    }

    // Toggle show/hide details button
    const toggleDetails = toggleDetailsBtn => {
        // Get the corresponding article
        const article = toggleDetailsBtn.parentElement.parentElement.children[1]
        if (article.classList.contains('hide')) {
            article.classList.remove('hide')
            toggleDetailsBtn.innerHTML = 'Hide Details'
        } else {
            article.classList.add('hide')
            toggleDetailsBtn.innerHTML = 'Show Details'
        }
    }

    // Toggle show/hide details visibility
    const toggleDetailsBtn = e => {
        const toggleDetailsBtn = e.target.nextSibling
        if (e.type === 'mouseover') {
            toggleDetailsBtn.style.opacity = '40%'
        } else if (e.type === 'mouseout') {
            toggleDetailsBtn.style.opacity = '0%'
        }
    }

    // Toggle edit/view button
    const toggleEditBtn = e => {
        const deleteBtns = document.getElementsByClassName('deleteBtn')
        if (e.target.innerHTML === 'Edit') {
            for (let i = 0; i < deleteBtns.length; i++) {
                deleteBtns[i].classList.remove('hide')
            }
            e.target.innerHTML = 'View'
        } else { 
            for (let i = 0; i < deleteBtns.length; i++) {
                deleteBtns[i].classList.add('hide')
            }
            e.target.innerHTML = 'Edit'
        }
    }

    // Open upload form
    const triggerUploadForm = () => {
        const formContainer = document.getElementsByClassName('formContainer')[0]
        formContainer.classList.remove('hide')
    }

    // Upload an image
    const uploadImage = async image => {
        const response = await fetch("http://localhost:5000/photos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(image)
        })
        const newPhoto = await response.json()
        setPhotos([...photos, newPhoto])
        alert('Success')
    }

    // Cancel upload image
    const cancelUpload = () => {
        const formContainer = document.getElementsByClassName('formContainer')[0]
        formContainer.classList.add('hide')
    }

    // Click delete button, show confirm deletion
    const clickDelete = id => {
        const confirmDeleteContainer = document.getElementsByClassName('confirmDeleteContainer')[0]
        confirmDeleteContainer.classList.remove('hide')
        setId(id)
    }

    // Cancel delete image   
    const cancelDelete = () => {
        const confirmDeleteContainer = document.getElementsByClassName('confirmDeleteContainer')[0]
        confirmDeleteContainer.classList.add('hide')
    }

    // Delete image
    const deleteImage = async () => {
        await fetch(`http://localhost:5000/photos/${id}`, {
            method: 'DELETE'
        })
        setPhotos(photos.filter(photo => photo.id !== id))
        alert('Success')
        const confirmDeleteContainer = document.getElementsByClassName('confirmDeleteContainer')[0]
        confirmDeleteContainer.classList.add('hide')
    }

    
    // Load photos and tags from server
    useEffect(() => {
        const changePhotos = async () => {
            // Get photos
            const photosFromServer = await fetchPhotos() 
            // Get tags
            let tagList = []
            for (let i = 0; i < photosFromServer.length; i++) {
                const tags = photosFromServer[i].tags
                for (let j = 0; j < tags.length; j++) {
                    if (!tagList.includes(tags[j])) {
                        tagList.push(tags[j])
                    }
                }
            }
            setPhotos(photosFromServer)
            setTags(tagList)
        }
        changePhotos()
    }, [])

    useEffect(() => {
        const tagList = document.getElementsByClassName('tagList')[0]
        const tagBtns = document.getElementsByClassName('tagBtn')
        console.log(tagBtns)
        if (tags.length === 1) {
            tagList.style.gridTemplateColumns = 'auto'
            for (let i = 0; i < tagBtns.length; i++) {
                tagBtns[i].style.marginLeft = '43%'
                tagBtns[i].style.marginRight = '43%'
            }
        } else if (tags.length === 2) {
            tagList.style.gridTemplateColumns = 'auto auto'
            for (let i = 0; i < tagBtns.length; i++) {
                tagBtns[i].style.marginLeft = '35%'
                tagBtns[i].style.marginRight = '35%'
            }
        } else if (tags.length === 3) {
            tagList.style.gridTemplateColumns = 'auto auto auto'
            for (let i = 0; i < tagBtns.length; i++) {
                tagBtns[i].style.marginLeft = '25%'
                tagBtns[i].style.marginRight = '25%'
            }
        }
    })
    

    return (
        <>
            <Upload onSubmit = {uploadImage} onCancel={cancelUpload} />
            <ConfirmDelete onDelete={deleteImage} onCancel={cancelDelete}/>
            <Header text='My Gallery' 
                tags={tags} 
                onFilter={filterPhotos}
                onEdit={toggleEditBtn}
                onUpload = {triggerUploadForm} />
            <hr/>
            <Photos photos={photos} 
                onHoverImage={toggleDetailsBtn} 
                onToggleDetails={toggleDetails} 
                onClickDelete = {clickDelete} />
        </>
    )
}

export default App
