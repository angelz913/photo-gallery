import React, { useState } from 'react'

const Upload = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [tagString, setTagString] = useState('')

    // Upload button function
    const upload = e => {
        e.preventDefault()
        console.log(title)
        console.log(description)
        console.log(link)
        if (!title) {
            alert('Please enter a title')
            return
        } else if (!link) {
            alert('Please enter a link')
            return
        }
        let tags = tagString ? tagString.split(',') : []
        onSubmit({title, description, link, tags})
        setTitle('')
        setDescription('')
        setLink('')
        setTagString('')
        onCancel()
    }
    
    // Cancel button function
    const cancel = e => {
        e.preventDefault()
        onCancel()
    }

    return (
        <div className='formContainer hide'>
            <form className='uploadForm'>
                <h2>Upload Image</h2>
                <div className='formControl'>
                    <label><b>Title</b></label>
                    <input 
                        type='text' 
                        placeholder='Give a title for your image'
                        value={title}
                        onChange = {e => setTitle(e.target.value)} />
                </div>
                 <div className='formControl'>
                    <label><b>Description</b></label>
                    <input id='description' 
                        type='text' 
                        placeholder='Give a description of your image'
                        value={description}
                        onChange = {e => setDescription(e.target.value)}/>
                </div>
                <div className='formControl'>
                    <label><b>Image URL</b></label>
                    <input 
                        type='text' 
                        placeholder='Enter the URL of your image'
                        value={link}
                        onChange = {e => setLink(e.target.value)}/>
                </div>
                <div className='formControl'>
                    <label><b>Tags</b></label>
                    <input 
                        type='text' 
                        placeholder='Enter some tags for your image, separated by commas'
                        value={tagString}
                        onChange = {e => setTagString(e.target.value)}/>
                </div>
                <button id='uploadBtn' onClick={e => upload(e)}>Upload! </button>
                <button id='cancelBtn' onClick={e => cancel(e)}>Cancel</button>
            </form>
        </div>
        
    )
}

export default Upload
