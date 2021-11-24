import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const NavLink = ({ display, name, icon, onClick, textClass }) => {
    return(
        <button
            onClick={onClick}
            aria-label={name}
            className={`flex justify-center items-center mx-auto lg:mx-5
                ${display === 'mobile' ? 'flex-col' : 'flex-row'}`}
        >
            { display === 'mobile' ? 
                <>
                    {icon}
                    <h2 className={textClass}>{name}</h2>
                </>
            :
                <h2 className={`text-5xl ${textClass}`}>{name}</h2>
            }
        </button>
    )
}

const SocialLink = ({ className, icon, onClick, name }) => {
    return(
        <button
            onClick={onClick}
            aria-label={name}
            className={`mx-1 lg:text-3xl xl:text-4xl 2xl:text-5xl ${className}`}
        >
            {icon}
        </button>
    )
}

const NavLogo = ({ image, onClick, className }) => {

    const logoImage = getImage(image);

    return(
        <GatsbyImage 
            onClick={onClick}
            className={className}
            image={logoImage} 
            alt="Jax Logo Image" 
        />     
    )
}

const NavBar = ({ display, menuLinks, socialLinks, logo, logoClick }) => {

    return(

        <nav 
            className={`absolute left-0 w-full flex flex-row items-center z-30
                ${display === 'mobile' ? 
                    'bottom-0'
                :
                    'top-0'}`}
        >

            { display === 'mobile' ?
                <div id="mobileHeader" onClick={logoClick} className="fixed top-0 left-0 w-full flex flex-row items-center pt-3 pb-1 px-3 bg-black">
                    <NavLogo image={logo} className="w-3/4"/>       
                </div>
                
            :
                <NavLogo image={logo} onClick={logoClick} className="lg:w-44 xl:w-48 2xl:w-52 m-3"/>
            }

            <div 
                id="navbar"
                className={`flex flex-row justify-center items-center w-full ${display === 'mobile' ? 'absolute bottom-0 left-0 pt-1 bg-black' : 'mx-5'}`}
            >
                { menuLinks.map((link, index) => {
                    return(
                            <NavLink
                                key={index}
                                onClick={link.onClick}
                                display={display}
                                icon={link.icon}
                                name={link.name}
                                textClass={link.textClass}
                            />
                    )
                })}
            </div>

            { display === 'mobile' ?
                null
            :
                <div className="flex flex-row items-center mx-3">
                    { socialLinks.map((link, index) => {
                        return(
                            <SocialLink
                                key={index}
                                icon={link.icon}
                                name={link.name}
                                onClick={link.onClick}
                            />
                        )
                    })}
                </div>       
            }


        </nav>

    )
}

export { NavBar }