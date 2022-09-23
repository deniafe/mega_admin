import React, { Dispatch, SetStateAction } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Avatar,
  Icon,
  Box,
  Button,
  Center,
  Spacer,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ToastId
} from '@chakra-ui/react'
import { MdDeleteForever, MdEdit, MdFingerprint, MdOutlineEmail, MdPerson, MdPhone, MdTimeToLeave, MdWarningAmber } from 'react-icons/md'
import AppInput from './AppInput'
import _ from 'lodash'

type driver = {
  driverId: string
  firstName: string
  lastName: string
  phone: string
  email: string 
  type: string
  password: string
  vehicleNumber: string
  vehicleColor: string
  vehicleModel: string
  imageUrl: string
}

type ChildrenProps = {
  onOpen: () => void
  onClose: () => void
  driversData?: any[]
  setModalBody: Dispatch<SetStateAction<string>>
  setId: Dispatch<SetStateAction<string>>
  setData: Dispatch<SetStateAction<driver | undefined>>
  showMessage: ({ status, message, title }: {
    title: string;
    message: string;
    status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}) => ToastId
}


const DriversTable = ({onOpen, driversData, setModalBody, setId, setData, showMessage, onClose}: ChildrenProps) => {

  console.log('A mere pretender', driversData)

  // const driversD = _.uniqBy(driversData, function (e) {
  //   return e.id;
  // });

  const drivers = driversData?.map(driver => {
    return {
      driverId: driver.id,
      firstName: driver.firstName || '',
      lastName: driver.lastName || '',
      rating: driver.rating || 0,
      phone: driver.phone || '',
      email: driver.email || '',
      type: driver.type || '',
      password: driver.password || '',
      vehicleNumber: driver.vehicle_details?.vehicle_number || '',
      vehicleModel: driver.vehicle_details?.car_model || '',
      vehicleColor: driver.vehicle_details?.car_color || '',
      imageUrl: driver.image_url || '',
    }
  })

  // const drivers = [
  //   {
  //     driverId: '1',
  //     firstName: 'Dan ',
  //     lastName: 'Vester',
  //     rating: 5,
  //     phone: '08035725391',
  //     email: 'dan@gmail.com',
  //     type: 'Mega Go',
  //     vehicleModel: 'Honda Accord',
  //     vehicleNumber: 'wdsefwrsew132ew4esd',
  //     vehicleColor: 'Red',
  //     imageUrl: 'https://firebasestorage.googleapis.com/v0/b/turing-audio-349909.appspot.com/o/profiles%2FY8JAwjDBATZhAhqUNkfRXYOOSdu2?alt=media&token=e98ab503-7965-4df9-89fe-0b951db98e56'
  //   },
  //   {
  //     driverId: '1',
  //     firstName: 'Dan ',
  //     lastName: 'Vester',
  //     rating: 5,
  //     phone: '08035725391',
  //     email: 'dan@gmail.com',
  //     type: 'Mega Go',
  //     vehicleModel: 'Honda Accord',
  //     vehicleNumber: 'wdsefwrsew132ew4esd',
  //     vehicleColor: 'Red',
  //     imageUrl: 'https://firebasestorage.googleapis.com/v0/b/turing-audio-349909.appspot.com/o/profiles%2FY8JAwjDBATZhAhqUNkfRXYOOSdu2?alt=media&token=e98ab503-7965-4df9-89fe-0b951db98e56'
  //   },
  //   {
  //     driverId: '1',
  //     firstName: 'Dan ',
  //     lastName: 'Vester',
  //     rating: 5,
  //     phone: '08035725391',
  //     email: 'dan@gmail.com',
  //     type: 'Mega Go',
  //     vehicleModel: 'Honda Accord',
  //     vehicleNumber: 'wdsefwrsew132ew4esd',
  //     vehicleColor: 'Red',
  //     imageUrl: 'https://firebasestorage.googleapis.com/v0/b/turing-audio-349909.appspot.com/o/profiles%2FY8JAwjDBATZhAhqUNkfRXYOOSdu2?alt=media&token=e98ab503-7965-4df9-89fe-0b951db98e56'
  //   },
  //   {
  //     driverId: '1',
  //     firstName: 'Dan ',
  //     lastName: 'Vester',
  //     rating: 5,
  //     phone: '08035725391',
  //     email: 'dan@gmail.com',
  //     type: 'Mega Go',
  //     vehicleModel: 'Honda Accord',
  //     vehicleNumber: 'wdsefwrsew132ew4esd',
  //     vehicleColor: 'Red',
  //     imageUrl: 'https://firebasestorage.googleapis.com/v0/b/turing-audio-349909.appspot.com/o/profiles%2FY8JAwjDBATZhAhqUNkfRXYOOSdu2?alt=media&token=e98ab503-7965-4df9-89fe-0b951db98e56'
  //   },
  //   {
  //     driverId: '1',
  //     firstName: 'Dan ',
  //     lastName: 'Vester',
  //     rating: 5,
  //     phone: '08035725391',
  //     email: 'dan@gmail.com',
  //     type: 'Mega Go',
  //     vehicleModel: 'Honda Accord',
  //     vehicleNumber: 'wdsefwrsew132ew4esd',
  //     vehicleColor: 'Red',
  //     imageUrl: 'https://firebasestorage.googleapis.com/v0/b/turing-audio-349909.appspot.com/o/profiles%2FY8JAwjDBATZhAhqUNkfRXYOOSdu2?alt=media&token=e98ab503-7965-4df9-89fe-0b951db98e56'
  //   },
  //   {
  //     driverId: '1',
  //     firstName: 'Dan ',
  //     lastName: 'Vester',
  //     rating: 5,
  //     phone: '08035725391',
  //     email: 'dan@gmail.com',
  //     type: 'Mega Go',
  //     vehicleModel: 'Honda Accord',
  //     vehicleNumber: 'wdsefwrsew132ew4esd',
  //     vehicleColor: 'Red',
  //     imageUrl: 'https://firebasestorage.googleapis.com/v0/b/turing-audio-349909.appspot.com/o/profiles%2FY8JAwjDBATZhAhqUNkfRXYOOSdu2?alt=media&token=e98ab503-7965-4df9-89fe-0b951db98e56'
  //   },
  //   {
  //     driverId: '1',
  //     firstName: 'Dan ',
  //     lastName: 'Vester',
  //     rating: 5,
  //     phone: '08035725391',
  //     email: 'dan@gmail.com',
  //     type: 'Mega Go',
  //     vehicleModel: 'Honda Accord',
  //     vehicleNumber: 'wdsefwrsew132ew4esd',
  //     vehicleColor: 'Red',
  //     imageUrl: 'https://firebasestorage.googleapis.com/v0/b/turing-audio-349909.appspot.com/o/profiles%2FY8JAwjDBATZhAhqUNkfRXYOOSdu2?alt=media&token=e98ab503-7965-4df9-89fe-0b951db98e56'
  //   },
  // ]

  const editDriver = () => {
    showMessage({title: 'Success', status: 'success', message: 'Driver Edited successfully'})
    onClose()
  }

  const deleteDriver = () => {
    showMessage({title: 'Success', status: 'success', message: 'Driver deleted successfully'})
    onClose()
  }

  const showEdit = (driver: driver) => {
    setModalBody('edit')
    setId(driver.driverId)
    setData(driver)
    onOpen()
  }

  const showDelete = (driverId: string) => {
    setModalBody('delete')
    setId(driverId)
    onOpen()
  }

  const driverItems = drivers?.map(menu => {
    return (
      <>
        <Tr>
         <Td>{menu.rating}</Td>
          <Td>
            <Avatar size='sm' name='Dan Abrahmov' src={menu.imageUrl} />
          </Td>
            
            <Td>{menu.firstName} {menu.lastName}</Td>
            <Td>{menu.phone}</Td>
            <Td>{menu.email}</Td>
            <Td>{menu.type}</Td>
            <Td>
              <Button onClick={() => {showEdit(menu)}} bg='white'  cursor={'pointer'} display='inline' px={1}>
                <Icon as={MdEdit} w={'18px'} h={'18px'} />
              </Button>
              <Button onClick={() => {showDelete(menu.driverId)}} display='inline' px={1} bg='white'>
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
                <Th>Email</Th>
                <Th>Type</Th>
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

export default DriversTable