import React from 'react'

export default props => (
    <header className='page-header'>
        <h2>{props.name} <small>{props.sub}</small> </h2>
    </header>
)