import React from 'react'

const TagButton = ({ tag, onFilter }) => {
    return (
        <button className='tagBtn' onClick={(e) => {
            const tagButton = e.target
            onFilter(tagButton)
        }}>{tag}</button>
    )
}

export default TagButton
