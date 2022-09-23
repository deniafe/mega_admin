import React from 'react'
import {useRouter} from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import { Container, Box, HStack, Icon, Text, Button, Center } from '@chakra-ui/react'
import { MdDashboard, MdCommute, MdPeople, MdDriveEta, MdCreditCard, MdMailOutline } from 'react-icons/md'
import logo from '../../public/megalogo.png'

const SideNav = () => {
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
    },
    {
      title: 'Messages',
      icon: MdMailOutline,
      href: 'messages',
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
    <Box pt={2} w='210px'>
      <Container mt={4}>
      <Center>
        <Box cursor={'pointer'}>
            <Link href='/'>
              <Image
                src={logo}
                alt="Mega Connect Logo"
                height={40}
                width={110}
              />
            </Link>
          </Box>
      </Center>

      {/* <Center>
        <Box mt={4} pt={4}>
            <Button bg="#000" color="white" borderRadius={2} py={5} _hover={{ bg: '#171923' }} leftIcon={<MdAdd />}>
              Create New Trip
            </Button>
          </Box>
      </Center> */}
      <Center>
           
      <Box pt={8}>
          {menuItems}
        </Box>
      </Center>
       
      </Container>
    </Box>
  )
}

export default SideNav