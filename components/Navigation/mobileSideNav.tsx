import React from 'react'
import { useRouter } from 'next/router'
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Link, HStack, Box, Icon, Text, Image, Button } from '@chakra-ui/react'
import { MdDashboard, MdCommute, MdPeople, MdDriveEta, MdCreditCard, MdAdd } from 'react-icons/md'
import logo from '../../public/megalogo.png'


type childrenProps = {
  onClose: () => void
  isOpen: boolean
}

const SideDrawer = ({onClose, isOpen}: childrenProps) => {
  const router = useRouter()
  const currentPage = router.pathname

  const navMenu = [
    {
      title: 'Dashboard',
      icon: MdDashboard,
      href: 'dashboard',
    },
    {
      title: 'Drivers',
      icon: MdDriveEta,
      href: 'drivers',
    },
    {
      title: 'Riders',
      icon: MdPeople,
      href: 'riders',
    },
    {
      title: 'Trips',
      icon: MdCommute,
      href: 'trips',
    },
    {
      title: 'Adverts',
      icon: MdCreditCard,
      href: 'adverts',
    }
  ]

  const menuItems = navMenu.map(menu => {
    const isPage = currentPage === `/${menu.href}`
    console.log(menu.href, currentPage, isPage)
    return (
      <>
        <Link href={`/${menu.href}`}>
          <HStack cursor={'pointer'} borderRadius='5px' py={3} spacing='2px' my={1}>
            <Box cursor={'pointer'}>
            <Icon as={menu.icon} color={isPage ? '#DA0B2C' : '#1A1A1A'} size={20} w={25} h={25} pr={2} pt='3px' />
            </Box>
            <Box  >
              <Text color={isPage ? '#DA0B2C' : '#1A1A1A'} fontSize={14} fontWeight={600} pl='3px' >{menu.title}</Text>
            </Box>
          </HStack>
        </Link>
      </>
    )
  })
  
  return (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>
          <Box pl={8} cursor={'pointer'}>
            <Link href='/'>
                <Image
                  src="./megalogo.png"
                  alt="Pvc Power Logo"
                  height={{base: '40px', md: '46px'}}
                  width={{base: '100px', md: '110px'}}
                />
            </Link>
          </Box>
          </DrawerHeader>
          <DrawerBody>
            
          <Box pl={8} pt={2}>
            {menuItems}
          </Box>
            {/* <Box pt='34px'>
              <Box
                pt='8px'
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                <Image
                  src='./volunteer.svg'
                  alt="Volunteer"
                  height={140}
                  width={125}
                />
              </Box>
              <Box
                pt='8px'
                display="flex" 
                alignItems="center" 
                justifyContent="center"
              >
                  <Text color='#706C6C' fontSize='13' textAlign='center' >
                      Want to be a part of this awesome project?
                  </Text>
              </Box>
        </Box> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  )
}

export default SideDrawer