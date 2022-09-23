import React from 'react'
import { useRouter } from 'next/router'
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Image, Link, HStack, Box, Icon, Text } from '@chakra-ui/react'
import { IoCheckmarkOutline, IoLocationSharp, IoMoonSharp } from 'react-icons/io5'

type childrenProps = {
  onClose: () => void
  isOpen: boolean
}

const TopDrawer = ({onClose, isOpen}: childrenProps) => {
  const router = useRouter()
  
  return (
    <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>
          <Image
              src="./pvcpowerlogo.png"
              alt="Pvc Power Logo"
              height={{base: '40px', md: '46px'}}
              width={{base: '130px', md: '165px'}}
            />
          </DrawerHeader>
          <DrawerBody>
            <Box 
            _hover={{bg: 'rgba(0, 201, 147, 0.17)'}}
            onClick={() => {
              router.push('/address')
            }}
            >
              <HStack borderRadius='5px' pl={2} py={1} spacing='2px' my={1}>
                  <Box  py={2} cursor={'pointer'} >
                  <Icon as={IoLocationSharp} w={30} h={30} pr={2} pt='3px' py={2} />
                  </Box>
                  <Box  py={2}>
                    <Text fontSize={14} fontWeight={500} pl='3px' >Find Nearest Location</Text>
                  </Box>
              </HStack>
            </Box>
            <a href="https://api.whatsapp.com/send?phone=7034165677&text=I%20would%20like%20to%20volunteer%20for%20this%20project" target="_blank" rel="noreferrer">
              <Box _hover={{bg: 'rgba(0, 201, 147, 0.17)'}}>
                <HStack borderRadius='5px' pl={2} py={1} spacing='2px' my={1}>
                    <Box py={2} cursor={'pointer'}>
                    <Icon as={IoCheckmarkOutline} w={30} h={30} pr={2} pt='3px' />
                    </Box>
                    <Box py={2} >
                      <Text fontSize={14} fontWeight={500} pl='3px' >Volunteer</Text>
                    </Box>
                </HStack>
              </Box>
            </a>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  )
}

export default TopDrawer