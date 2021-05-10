import React from 'react'

const ConfirmDelete = ( {onDelete, onCancel} ) => {
    return (
        <div className='confirmDeleteContainer hide'>
            <div className='confirmDelete'>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this item?</p>
                <p>This operation cannot be undone. </p>
                <button id='cancelDeleteBtn' onClick={onCancel}>Cancel</button>
                <button id='confirmDeleteBtn' onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ConfirmDelete
