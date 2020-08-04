import React from 'react'

function MainContent(props) {
    return (
        <div className="main-content">
            {props.children}
        </div>
    )
}

export default MainContent
