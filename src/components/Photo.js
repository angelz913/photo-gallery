import React from 'react'

const Photo = ({ photo, onHoverImage, onToggleDetails, onClickDelete }) => {
    const { id, link, title, description } = photo
    return (
        <section className='photo'>
            <div className='photoContainer'>
                <img src={link} alt={title} 
                    onMouseOver={e => onHoverImage(e)} 
                    onMouseOut={e => onHoverImage(e)}/>
                <button className='toggleDetailsBtn' 
                    onClick={e => onToggleDetails(e.target)} 
                    onMouseOver={e => e.target.style.opacity = '80%'}>
                    Show Details
                </button>
                <button className='deleteBtn hide'
                    onClick={() => {
                        onClickDelete(id)
                    }}>
                    &times;
                </button>
            </div>
            <article className='hide'>
                <h2>{title}</h2>
                <p>{description}</p>
            </article>
        </section>
    )
}

export default Photo
