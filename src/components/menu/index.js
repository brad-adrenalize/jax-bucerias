import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Menu = () => {

    const menuData = useStaticQuery(graphql`
        query {
          starters: graphCmsMenuCategory(name: {eq: "Starters"}) {
            menuItems {
              name
              description
              price
              addOns {
                name
                price
              }
            }
          }
          mains: graphCmsMenuCategory(name: {eq: "Mains"}) {
            menuItems {
              name
              description
              price
              addOns {
                name
                price
              }
            }
          }
          frozenDrinks: graphCmsMenuCategory(name: {eq: "Frozen Drinks & Margaritas"}) {
            subCategories {
              name
              menuItems {
                name
                description
                price
                addOns {
                  name
                  price
                }
              }
            }
          }
          cocktails: graphCmsMenuCategory(name: {eq: "Cocktails & Martinis"}) {
            subCategories {
              name
              menuItems {
                name
                description
                price
                addOns {
                  name
                  price
                }
              }
            }
          }
          beer: graphCmsMenuCategory(name: {eq: "Beer, Wine & Coolers"}) {
            subCategories {
              name
              menuItems {
                name
                description
                price
                addOns {
                  name
                  price
                }
              }
            }
          }
          shots: graphCmsMenuCategory(name: {eq: "Shots, Liquor & Liqueurs"}) {
            subCategories {
              name
              menuItems {
                name
                description
                price
                addOns {
                  name
                  price
                }
              }
            }
          }
          nonAlcoholic: graphCmsMenuCategory(name: {eq: "Non-Alcoholic"}) {
            subCategories {
              name
              menuItems {
                name
                description
                price
                addOns {
                  name
                  price
                }
              }
            }
          }
        }
    `);


    const [ menuSelected, setMenuSelected ] = useState('Food')
    const [ menuCategorySelected, setMenuCategorySelected ] = useState('Starters')

    const MenuItem = ({ name, description, price, addOns }) => {
        return(
            <div className="flex flex-col h-auto mx-1 p-2">
                <h2 className="text-2xl text-white">{name}</h2>
                 <p className="text-lg">{description}</p>
                 {addOns !== null ?
                    <div className="flex flex-row items-center">
                        {addOns.map((addOn) => {
                            return(
                                <p className="text-lg italic mr-1">Add {addOn.name} ${addOn.price}. </p>
                            )
                        })}
                    </div>
                : null}
                    
                <h3 className="text-xl text-green-600">${price}</h3>
            </div>
        )
    }

    const [ menuWrapperHeight, setMenuWrapperHeight ] = useState(0)
    const [ menuWrapperTop, setMenuWrapperTop ] = useState(0)

    useEffect(() => {
      if(document.getElementById("menu-header") !== null){
        setMenuWrapperHeight(
            document.getElementById("display").offsetHeight - 
            document.getElementById("menu-header").offsetHeight
        );
        setMenuWrapperTop(
            document.getElementById('menu-header').offsetHeight
        );
      };
    })

    useEffect(() => {
      if(menuSelected === 'Food'){
        setMenuCategorySelected('Starters')
      }
      else{
        setMenuCategorySelected('frozenDrinks')
      }
    }, [ menuSelected ])
    return(

        <div className="w-full h-full bg-black bg-opacity-60">
            <div id="menu-header" className="absolute top-0 left-0 w-full flex flex-col items-center justify-center pb-2">
                <h2 className="text-2xl mt-1 mb-2">Choose A Menu</h2>
                <div className="flex flex-row items-center w-full px-4">
                    <button 
                        className={`text-2xl w-1/2 mr-1 py-1 rounded-md ${menuSelected === 'Food' ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                        onClick={() => setMenuSelected('Food')}
                        aria-label={`Jax Food Menu`}
                    >
                        <h2>Food</h2>
                    </button>
                    <button 
                        className={`text-2xl w-1/2 ml-1 py-1 rounded-md ${menuSelected === 'Drinks' ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                        onClick={() => setMenuSelected('Drinks')}
                        aria-label={`Jax Drinks Menu`}
                    >
                        <h2>Drinks</h2>
                    </button>
                </div>
            </div>
            <div className="absolute w-full overflow-auto" style={{top: menuWrapperTop, height: menuWrapperHeight}}> 
                <div>
                    {menuSelected === 'Food' ?
                        <div className="flex flex-col">
                            <div className="flex flex-col items-center px-4">
                                <button 
                                    className={`text-xl p-1 w-full rounded-sm ${menuCategorySelected === 'Starters' ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                                    onClick={() => setMenuCategorySelected('Starters')}
                                    aria-label={`Jax Starters Menu`}
                                >
                                    <h2>Starters</h2>
                                </button>
                                <button 
                                    className={`text-xl p-1 w-full mt-1 mb-2 rounded-sm ${menuCategorySelected === 'Mains' ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                                    onClick={() => setMenuCategorySelected('Mains')}
                                    aria-label={`Jax Mains Menu`}
                                >
                                    <h2>Mains</h2>
                                </button>
                            </div>
                            <div className="grid grid-cols-1">
                                {menuCategorySelected === 'Starters' ?
                                    <>
                                        {menuData.starters.menuItems.map((item, index) => {
                                            return(
                                                <MenuItem
                                                    key={index}
                                                    name={item.name}
                                                    description={item.description}
                                                    price={item.price}
                                                    addOns={item.addOns}
                                                />
                                            )
                                        })}
                                    </>
                                :
                                    <>
                                        {menuData.mains.menuItems.map((item, index) => {
                                            return(
                                                <MenuItem
                                                    key={index}
                                                    name={item.name}
                                                    description={item.description}
                                                    price={item.price}
                                                    addOns={item.addOns}
                                                />
                                            )
                                        })}
                                    </>
                                }
                            </div>
                        </div>
                    :
                      <div className="flex flex-col">
                        <div className="grid grid-cols-1 gap-1 px-4">
                            <button 
                                className={`text-xl py-1 w-full rounded-sm ${menuCategorySelected === 'frozenDrinks' ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                                onClick={() => setMenuCategorySelected('frozenDrinks')}
                                aria-label={`Jax Frozen Drinks & Margaritas Menu`}
                            >
                                <h2>Frozen Drinks & Margaritas</h2>
                            </button>
                            <button 
                                className={`text-xl py-1 w-full rounded-sm ${menuCategorySelected === 'cocktails' ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                                onClick={() => setMenuCategorySelected('cocktails')}
                                aria-label={`Jax Cocktails & Martinis Menu`}
                            >
                                <h2>Cocktails & Martinis</h2>
                            </button>
                            <button 
                                className={`text-xl py-1 w-full rounded-sm ${menuCategorySelected === 'beer' ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                                onClick={() => setMenuCategorySelected('beer')}
                                aria-label={`Jax Beer, Wine & Coolers Menu`}
                            >
                                <h2>Beer, Wine & Coolers</h2>
                            </button>
                            <button 
                                className={`text-xl py-1 w-full rounded-sm ${menuCategorySelected === 'shots' ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                                onClick={() => setMenuCategorySelected('shots')}
                                aria-label={`Jax Shots, Liquor & Liqueurs Menu`}
                            >
                                <h2>Shots, Liquor & Liqueurs</h2>
                            </button>
                            <button 
                                className={`text-xl py-1 w-full rounded-sm ${menuCategorySelected === 'nonAlcoholic' ? 'bg-red-700 text-white' : 'bg-white text-black'}`}
                                onClick={() => setMenuCategorySelected('nonAlcoholic')}
                                aria-label={`Jax Non-Alcoholic Menu`}
                            >
                                <h2>Non-Alcoholic</h2>
                            </button>
                        </div>
                        <div className="grid grid-cols-1">
                            {menuCategorySelected === 'frozenDrinks' ?
                                <>
                                    {menuData.frozenDrinks.subCategories.map((category, index) => {                            
                                        return(
                                            <div key={index}>
                                              <h2 className="text-3xl text-red-600 px-3 pt-4">{category.name}</h2>
                                              {category.menuItems.map((item, index) => {
                                                return(          
                                                  <MenuItem
                                                    key={index}
                                                    name={item.name}
                                                    description={item.description}
                                                    price={item.price}
                                                    addOns={item.addOns}
                                                  />
                                                )
                                              })}
                                            </div>
                                        )
                                    })}
                                </>
                            : menuCategorySelected === 'cocktails' ?
                                <>
                                  {menuData.cocktails.subCategories.map((category, index) => {                            
                                      return(
                                          <div key={index}>
                                            <h2 className="text-3xl text-red-600 px-3 pt-4">{category.name}</h2>
                                            {category.menuItems.map((item, index) => {
                                              return(          
                                                <MenuItem
                                                  key={index}
                                                  name={item.name}
                                                  description={item.description}
                                                  price={item.price}
                                                  addOns={item.addOns}
                                                />
                                              )
                                            })}
                                          </div>
                                      )
                                  })}
                                </>
                              : menuCategorySelected === 'beer' ?
                                <>
                                  {menuData.beer.subCategories.map((category, index) => {                            
                                      return(
                                          <div key={index}>
                                            <h2 className="text-3xl text-red-600 px-3 pt-4">{category.name}</h2>
                                            {category.menuItems.map((item, index) => {
                                              return(          
                                                <MenuItem
                                                  key={index}
                                                  name={item.name}
                                                  description={item.description}
                                                  price={item.price}
                                                  addOns={item.addOns}
                                                />
                                              )
                                            })}
                                          </div>
                                      )
                                  })}
                                </>
                              : menuCategorySelected === 'shots' ?
                                <>
                                  {menuData.shots.subCategories.map((category, index) => {                            
                                      return(
                                          <div key={index}>
                                            <h2 className="text-3xl text-red-600 px-3 pt-4">{category.name}</h2>
                                            {category.menuItems.map((item, index) => {
                                              return(          
                                                <MenuItem
                                                  key={index}
                                                  name={item.name}
                                                  description={item.description}
                                                  price={item.price}
                                                  addOns={item.addOns}
                                                />
                                              )
                                            })}
                                          </div>
                                      )
                                  })}
                                </>
                              : menuCategorySelected === 'nonAlcoholic' ?
                                <>
                                  {menuData.nonAlcoholic.subCategories.map((category, index) => {                            
                                      return(
                                          <div key={index}>
                                            <h2 className="text-3xl text-red-600 px-3 pt-4">{category.name}</h2>
                                            {category.menuItems.map((item, index) => {
                                              return(          
                                                <MenuItem
                                                  key={index}
                                                  name={item.name}
                                                  description={item.description}
                                                  price={item.price}
                                                  addOns={item.addOns}
                                                />
                                              )
                                            })}
                                          </div>
                                      )
                                  })}
                                </>
                              : null
                            }
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default Menu