import { Box, Center, HStack, Text, Icon } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons'

type ChildrenProps = {
  title?: string
  icon?: IconType
  number: string
  color: string
}

const DashboardCard = ({icon, title, number, color}: ChildrenProps) => {
  return (
    <HStack px={4} pt='3px' spacing='10px'>
    <Box>
      <Icon as={icon} color={color} w={12} h={12} />
    </Box>
    <Box py={4}>
      <Text fontSize='16px' fontWeight='400' color='#333'>{title}</Text>
      <Center>
      <Text fontSize='20px' fontWeight='500' color={color}>{number}</Text>
      </Center>
    </Box>
  </HStack>
  )
}

export default DashboardCard