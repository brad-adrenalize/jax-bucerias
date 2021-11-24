import React, { useContext, useState, useEffect } from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { isBrowser, useWindowHeight } from "../hooks"
import { Context } from '../components/context'
import { PageWrapper } from '../components/layout'
import { NavBar } from '../components/nav'
import { IoFastFoodSharp, IoCalendar, IoCartSharp, IoStar, IoChatboxEllipses } from 'react-icons/io5'
import { FaFacebook, FaInstagram, FaTripadvisor } from 'react-icons/fa'
import Home from '../components/home'
import Menu from '../components/menu'
import Events from '../components/events'
import Shop from '../components/shop'
import Vip from '../components/vip'
import Contact from '../components/contact'

const Index = () => {

  const context = useContext(Context);

  const pageData = useStaticQuery(graphql`
    query {
      siteID: graphCmsSiteId {
        title
        description
        logo {
          gatsbyImageData(quality: 100)
        }
        mobileLogo {
          gatsbyImageData(quality: 100)
        }
        backgroundImage {
          gatsbyImageData(quality: 100)
        }
        backgroundColor {
          hex
        }
      }
    }
  `);

  const [ page, setPage ] = useState('home');

  useEffect(()=> {
    if(!isBrowser){
      if(window.location.hash === '#menu'){
        setPage('menu');
        window.history.pushState('home','Home','/')
      }
    }
  }, [])

  const menuLinks = [
      {
        name: 'Menu',
        onClick: () => setPage('menu'),
        icon: <IoFastFoodSharp className={`text-4xl ${page === 'menu' ? 'menu-link-selected-icon' : null}`} />,
        textClass: `${page === 'menu' ? 'menu-link-selected-text' : null}`
      },
      {
        name: 'Events',
        onClick: () => setPage('events'),
        icon: <IoCalendar className={`text-4xl ${page === 'events' ? 'menu-link-selected transform scale-90' : null}`} />,
        textClass: `${page === 'events' ? 'menu-link-selected-text' : null}`
      },
      {
        name: 'Shop',
        onClick: () => setPage('shop'),
        icon: <IoCartSharp className={`text-4xl transform -translate-x-1 ${page === 'shop' ? 'menu-link-selected' : null}`} />,
        textClass: `${page === 'shop' ? 'menu-link-selected-text' : null}`
      },
      {
        name: 'VIP',
        onClick: () => setPage('vip'),
        icon: <IoStar className={`text-4xl ${page === 'vip' ? 'menu-link-selected' : null}`} />,
        textClass: `${page === 'vip' ? 'menu-link-selected-text' : null}`
      },
      {
        name: 'Contact',
        onClick: () => setPage('contact'),
        icon: <IoChatboxEllipses className={`text-4xl ${page === 'contact' ? 'menu-link-selected' : null}`} />,
        textClass: `${page === 'contact' ? 'menu-link-selected-text' : null}`
      }
    ];

    const socialLinks = [
      {
        name: 'Facebook',
        icon: <FaFacebook className="" />,
        onClick: () => window.open('https://www.facebook.com')
      },
      {
        name: 'Instagram',
        icon: <FaInstagram className="" />,
        onClick: () => window.open('https://www.instagram.com')
      },
      {
        name: 'Trip Advisor',
        icon: <FaTripadvisor className="" />,
        onClick: () => window.open('https://www.tripadvisor.com')
      },
    ];

    let windowHeight;
    if(!isBrowser){
      windowHeight = useWindowHeight()
    }
  
    const [ displayHeight, setDisplayHeight ] = useState(0)
    const [ displayTop, setDisplayTop ] = useState(0)

    useEffect(() => {
      if(document.getElementById("mobileHeader") !== null){
        setDisplayHeight(
            windowHeight -
            document.getElementById("mobileHeader").offsetHeight - 
            document.getElementById("navbar").offsetHeight
        );
        setDisplayTop(
            document.getElementById('mobileHeader').offsetHeight
        );
    };
    })

  return(

    <PageWrapper 
      bgImage={pageData.siteID.backgroundImage}
      bgColor={pageData.siteID.backgroundColor}
    >
      <NavBar
        display={context.display}
        logo={context.display === 'mobile' ? pageData.siteID.mobileLogo : pageData.siteID.logo}
        logoClick={() => setPage('home')}
        menuLinks={menuLinks}
        socialLinks={socialLinks}
      />

      <div id="display" className="fixed left-0 w-full z-10 bg-black bg-opacity-60" style={{top: displayTop, height: displayHeight}}>
        {page === 'menu' ?
          <Menu/>
        : page === 'events' ?
          <Events/>
        : page === 'shop' ?
          <Shop/>
        : page === 'vip' ?
          <Vip/>
        : page === 'contact' ?
          <Contact/>
        :
          <Home/>
        }
      </div>
    </PageWrapper>

  )

}

export default Index