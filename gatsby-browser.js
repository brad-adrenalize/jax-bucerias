import React from 'react'
import './src/styles/global.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ContextProvider } from './src/components/context';

  const wrapRootElement = ({ element }) => {
    return(
          <ContextProvider>
            {element}
          </ContextProvider>
      )
    };

  export { wrapRootElement };