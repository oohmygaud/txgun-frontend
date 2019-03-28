import React from 'react';

const ContentWrapper = (props) => {
    return <div className='bodyComponent' style={{padding:'0.5em 1em'}}>
        {props.children}
    </div>
}

export default ContentWrapper;