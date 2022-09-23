import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Box, Spacer, Text, Icon, useDisclosure, Divider } from '@chakra-ui/react'
import TopDrawer from './topdrawer'
import { MdOutlineLogout } from 'react-icons/md'
import { auth } from '../../firebase'
import { signOut } from "firebase/auth";

type ChildrenProps = {
  page?: string
}


const Navbar = ({page}: ChildrenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  const signout = () => {
    signOut(auth).then(() => {
      router.push('/')
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <>
    <TopDrawer onClose={onClose} isOpen={isOpen} />
    <Box 
     mx={2}
    //  pt={{base: 2, md: 4}}
     px={{md: 3}}
    >
      <Flex  py={{base: 2, md: 3}}  mb={{base: 4, md: 0}} minWidth='max-content' alignItems='center' gap='2'>
      <Spacer display={{base: 'none', md: 'inline', lg: 'none'}}/>
        <Box p='2'>
           <Text  display={{base: 'none', md: 'inline'}} fontSize='18px' fontWeight='500'>{page}</Text>
        </Box>
        <Spacer />
        
        <Box 
          bg={'white'} 
          py={2}
          px={3}
          borderRadius={100} 
          cursor={'pointer'}
          boxShadow= 'rgba(170, 170, 170, 0.47) 1px 1px 8px 0'
          display={{base: 'inline', md: 'inline'}}
          onClick={signout}
          >
          <Icon as={MdOutlineLogout} color={'black'} w={'18px'} h={'18px'} />
        </Box>
      </Flex>
      <Box height='1px' bg='#E2E8F0'></Box>
    </Box>
    </>
  )
}

export default Navbar