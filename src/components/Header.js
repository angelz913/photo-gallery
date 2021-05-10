import React from 'react'
import TagButton from './TagButton'

const Header = ({ text, tags, onFilter, onEdit, onUpload }) => {
    return (
        <header>
            <div className='headerButtonContainer'>
                <button onClick={onUpload} className='headerBtn'>Upload</button>
                <button onClick={onEdit} className='headerBtn'>Edit</button>
            </div>
            <h1>{text}</h1>
            <div className='tagList'>
                {tags.map((tag, index) => {
                    return <TagButton tag={tag} onFilter={onFilter} key={index}/>
                })}
            </div>
        </header>
    )
}

export default Header
