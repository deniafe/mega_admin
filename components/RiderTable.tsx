import React, { Dispatch, SetStateAction } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Icon,
  Button,
  ToastId
} from '@chakra-ui/react'
import { MdDeleteForever, MdEdit } from 'react-icons/md'

type rider = {
  riderId: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  membership: string
  imageUrl: string
}


type ChildrenProps = {
  onOpen: () => void
  onClose: () => void
  ridersData?: any[]
  setModalBody: Dispatch<SetStateAction<string>>
  setId: Dispatch<SetStateAction<string>>
  setData: Dispatch<SetStateAction<rider | undefined>>
  showMessage: ({ status, message, title }: {
    title: string;
    message: string;
    status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}) => ToastId
}


const RidersTable = ({onOpen, ridersData, setModalBody, setId, setData, showMessage, onClose}: ChildrenProps) => {

  const riders = ridersData?.map(rider => {
    return {
      riderId: rider.id,
      firstName: rider.firstName || '',
      lastName: rider.lastName || '',
      email: rider.email || '',
      password: rider.password || '',
      rating: rider.rating || 0,
      phone: rider.phone || '',
      membership: rider.membership || '',
      imageUrl: rider.imageUrl || '',
    }
  })

  const editRider = () => {
    showMessage({title: 'Success', status: 'success', message: 'Rider Edited successfully'})
    onClose()
  }

  const deleteRider = () => {
    showMessage({title: 'Success', status: 'success', message: 'Rider deleted successfully'})
    onClose()
  }

  const showEdit = (rider: rider) => {
    setModalBody('edit')
    setId(rider.riderId)
    setData(rider)
    onOpen()
  }

  const showDelete = (riderId: string) => {
    setModalBody('delete')
    setId(riderId)
    onOpen()
  }

  const driverItems = riders?.map(menu => {
    return (
      <>
        <Tr>
         <Td>{menu.rating}</Td>
          <Td>
            <Avatar size='sm' name='Dan Abrahmov' src={menu.imageUrl} />
          </Td>
            
            <Td>{menu.firstName} {menu.lastName}</Td>
            <Td>{menu.phone}</Td>
            <Td>
              <Button onClick={() => {showEdit(menu)}} bg='white'  cursor={'pointer'} display='inline' px={1}>
                <Icon as={MdEdit} w={'18px'} h={'18px'} />
              </Button>
              <Button onClick={() => {showDelete(menu.riderId)}} display='inline' px={1} bg='white'>
                <Icon as={MdDeleteForever} color={'#DA0B2C'} w={'18px'} h={'18px'} />
              </Button>
            </Td>
          </Tr>
      </>
    )
  })

  return (
    <>
        <TableContainer>
          <Table variant='simple'>
            {/* <TableCaption></TableCaption> */}
            <Thead>
              <Tr>
                <Th>Rating</Th>
                <Th>Image</Th>
                <Th>Full Name</Th>
                <Th>Phone</Th>
                <Th>Actions</Th>
                {/* <Th isNumeric>multiply by</Th> */}
              </Tr>
            </Thead>
            <Tbody>
             {driverItems}
            </Tbody>
          </Table>
        </TableContainer>
    </>
  )
}

export default RidersTable