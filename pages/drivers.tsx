import { ReactElement, useEffect } from 'react'
import { useState } from 'react'
import { Box, Text, useDisclosure, useToast, Button, Spacer, Center, Icon, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import type { NextPageWithLayout } from './_app'
import Navbar from '../components/Navigation/navbar'
import { MdAdd } from 'react-icons/md'
import DriversTable from '../components/DriverTable'
import AppModal from '../components/Modal'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase'

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

const Drivers: NextPageWithLayout = () => {
  const [data, setData] = useState<driver | undefined>()
  const [drivers, setDrivers] = useState<any[]>()
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>(''); 
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>(''); 
  const [phone, setPhone] = useState<string>('');
  const [type, setType] = useState<string>();
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [vehicleColor, setVehicleColor] = useState<string>('');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [loading, setLoading] = useState(false)
  const [modalBody, setModalBody] = useState('')
  const [id, setId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const getDrivers = () => {
    let drivers: any[] = []
    const starCountRef = ref(db, 'drivers/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key]);
            const updatedData = {...data[key], id: key}
            console.log('Updated Driver Data') 
            console.log(updatedData)
            drivers.push(updatedData)
            console.log(drivers.length)
        }
    }
    setDrivers(drivers)
    drivers = []
      // console.log(data.length)
      // updateStarCount(postElement, data);
    });
  }

  const showMessage = ({status, message, title}: {title: string, message: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined}) =>
  toast({
    title: title,
    position: 'top-right',
    description: message,
    status: status,
    duration: 9000,
    isClosable: true,
  })

  const handleEmailChange = (event: {target: {value: string}}) =>  {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: {target: {value: string}}) =>  {
    setPassword(event.target.value)
  }

  
  const handleFirstNameChange = (event: {target: {value: string}}) =>  {
    console.log('First Name', event.target.value )
    setFirstName(event.target.value)
    console.log('fields', firstName)
  }

  const handleLastNameChange = (event: {target: {value: string}}) =>  {
    setLastName(event.target.value)
  }

  const handlePhoneChange = (event: {target: {value: string}}) =>  {
    setPhone(event.target.value)
  }

  const handleTypeChange = (event: {target: {value: string}}) =>  {
    setType(event.target.value)
  }

  const handleVehicleNumberChange = (event: {target: {value: string}}) =>  {
    setVehicleNumber(event.target.value)
  }

  const handleVehicleModelChange = (event: {target: {value: string}}) =>  {
    setVehicleModel(event.target.value)
  }

  const handleVehicleColorChange = (event: {target: {value: string}}) =>  {
    setVehicleColor(event.target.value)
  }

   const handleSubmit = (e: { preventDefault: () => void; }) => {
     e.preventDefault(); // avoid default behaviour

     console.log('fields', firstName)

    //  console.log('Fields', password, email, firstName, lastName, vehicleColor, vehicleModel, vehicleNumber, type, phone)
     
     if(!password || !email || !firstName || !lastName || !vehicleNumber || !vehicleColor || !vehicleModel || !type || !phone){ // check for any null value
       return  showMessage({
        title: 'Error',
        message: 'All fields are required',
        status: 'error'
      })
     }
     saveDriver()
   }

  const saveDriver = () => {
    showMessage({title: 'Success', status: 'success', message: 'Driver Created successfully'})
    onClose()
  }


  const showAdd = () => {
    setModalBody('add')
    onOpen()
  }

  useEffect(() => {
    getDrivers()
   }, []) 
  
  return (
    <>
     <Box bg='#fff' h='100vh'>
       <Navbar page="Driver" />
       <Box px={6} mt={8}>
        <Box display={{md: 'flex'}}>
          <Text mb={4} fontSize='16px' fontWeight='500'>Drivers Data</Text>
          <Spacer></Spacer>
          <Box>
            <Button onClick={showAdd}bg="#000" color="white" borderRadius={2} py={5} _hover={{ bg: '#171923' }} leftIcon={<MdAdd />}>
              Add New Driver
            </Button>
          </Box>
        </Box>
          <Box w='100%' h='auto' bg='white'
               my={8}
               py={4}
               px={4}
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
            <DriversTable driversData={drivers} onOpen={onOpen} setModalBody={setModalBody} setId={setId} setData={setData} showMessage={showMessage} onClose={onClose} />
          </Box>
       </Box>
      </Box>
      <AppModal onClose={onClose} isOpen={isOpen} body={modalBody} modalType='add' id={id} data={data} />
    </>
  )

}

Drivers.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
   
  )
}

export default Drivers
