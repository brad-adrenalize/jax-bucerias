import React, { useState, createContext, useEffect } from 'react';
import { useWindowWidth } from '../../hooks';

const Context = createContext();

const ContextProvider = ({ children }) => {

    const [ display, setDisplay ] = useState('mobile');

    let browserWidth = useWindowWidth();
    
    useEffect(() => {
        if(browserWidth < 600){
            setDisplay('mobile')
        }
        else{
            setDisplay('desktop')
        }
    }, [ browserWidth ]);
    

    return (

        <Context.Provider value={{ display }}>
        	{children}
        </Context.Provider>
    )
};

export { ContextProvider, Context };


