import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const PageWrapper = ({ bgImage, bgColor, children }) => {

    const backgroundImage = getImage(bgImage);

    return(
        <div
            id="page-wrapper"
            className="fixed top-0 left-0 w-full h-full"
            style={{backgroundColor: bgColor.hex }} 
        >
        
        <GatsbyImage 
            className="fixed w-full lg:w-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            image={backgroundImage} 
            alt="Jax Background Image" 
        />
            {children}
        </div>
    )
}

export { PageWrapper }