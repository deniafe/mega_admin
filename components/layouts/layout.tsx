import { useContext, useEffect } from 'react'
import Footer from '../Navigation/footer'
import { ChakraProvider } from '@chakra-ui/react'
// import '@fontsource/barlow'
// import '@fontsource/barlow/500.css'

type ChildrenProps = {
  children: any;
}

import theme from '../../theme'

const Layout = ({ children }: ChildrenProps ) => {

  return (
    <>
      {/* <AppStateProvider> */}
        <ChakraProvider theme={theme}>
          <main>{children}</main>
          {/* <Footer /> */}
        </ChakraProvider>
      {/* </AppStateProvider> */}
    </>
  )
}

export default Layout