import { Box, Button, Center, Icon, Modal, Text, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { MdFingerprint, MdOutlineEmail, MdPerson, MdPhone, MdTimeToLeave, MdWarningAmber } from 'react-icons/md'
import AppInput from './AppInput'
import TypeSelect from './TypeSelect'


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
  onClose: () => void
  isOpen: boolean
  body: string
  modalType: string
  id?: string
  data?: driver
}

const AppModal = ({onClose, isOpen, body, modalType, id, data }: ChildrenProps) => {

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>(); 
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>(); 
  const [phone, setPhone] = useState<string>();
  const [type, setType] = useState<string>();
  const [vehicleNumber, setVehicleNumber] = useState<string>();
  const [vehicleColor, setVehicleColor] = useState<string>();
  const [vehicleModel, setVehicleModel] = useState<string>();
  const [loading, setLoading] = useState(false)
  const toast = useToast()

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

   const handleEditSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // avoid default behaviour

    console.log('fields', firstName, password, email, firstName, vehicleColor, lastName, vehicleNumber, vehicleModel, type, phone)

   //  console.log('Fields', password, email, firstName, lastName, vehicleColor, vehicleModel, vehicleNumber, type, phone)
    
    if(!password || !email || !firstName || !lastName || !vehicleNumber || !vehicleColor || !vehicleModel || !type || !phone){ // check for any null value
      return  showMessage({
       title: 'Error',
       message: 'All fields are required',
       status: 'error'
     })
    }
    editDriver()
  }

  const saveDriver = () => {
    setLoading(true)
    axios.post('https://us-central1-turing-audio-349909.cloudfunctions.net/api/drivers', {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      imageUrl: "",
      password: password,
      email: email,
      type: type,
      vehicle_details: {
        car_color: vehicleColor,
        car_model: vehicleModel,
        vehicle_number: vehicleNumber
      }
    })
    .then(function (response) {
      setLoading(false)
      console.log(response);
      showMessage({title: 'Success', status: 'success', message: 'Driver added successfully'})
      onClose()
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error);
      showMessage({title: 'Error', status: 'error', message: error.response.data.message})
      onClose()
    });
  }

  const editDriver = () => {
    setLoading(true)
    axios.patch('https://us-central1-turing-audio-349909.cloudfunctions.net/api/drivers/'+ id, {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      imageUrl: "",
      type: type,
      password: password,
      email: email,
      vehicle_details: {
        car_color: vehicleColor,
        car_model: vehicleModel,
        vehicle_number: vehicleNumber
      }
    })
    .then(function (response) {
      setLoading(false)
      console.log(response);
      showMessage({title: 'Success', status: 'success', message: 'Driver updated successfully'})
      onClose()
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error);
      showMessage({title: 'Error', status: 'error', message: error.response.data.message})
      onClose()
    });
  }

  const deleteDriver = () => {
    setLoading(true)
    axios.delete('https://us-central1-turing-audio-349909.cloudfunctions.net/api/drivers/'+ id)
    .then(function (response) {
      setLoading(false)
      console.log(response);
      showMessage({title: 'Success', status: 'success', message: 'Driver deleted successfully'})
      onClose()
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error);
      showMessage({title: 'Error', status: 'error', message: error.message})
      onClose()
    });
  }

  const addDriverBody =  <>
      <ModalHeader>Add New Driver</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <Box py={2} display={'flex'} gap={'6px'} >
        <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label="First Name" func={handleFirstNameChange}/>
        <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label="Last Name" func={handleLastNameChange}/>
      </Box> 
      <Box py={2} display={'flex'} gap={'6px'}>
        <AppInput icon={<MdPhone color='gray.300' size='20' />} type="text" label="Phone Nunmber" func={handlePhoneChange}/>
        <AppInput icon={<MdOutlineEmail color='gray.300' size='20' />} type="email" label="Email" func={handleEmailChange}/>
      </Box> 
      <Box py={2} display={'flex'} gap={'6px'}>
        <TypeSelect label='Select Type' func={handleTypeChange}/>
        <AppInput icon={<MdTimeToLeave color='gray.300' size='20' />} type="text" label="Vehicle Number" func={handleVehicleNumberChange}/>
      </Box> 
      <Box py={2} display={'flex'} gap={'6px'}>
        <AppInput icon={<MdTimeToLeave color='gray.300' size='20' />} type="text" label="Vehicle Color" func={handleVehicleColorChange}/>
        <AppInput icon={<MdTimeToLeave color='gray.300' size='20' />} type="text" label="Vehicle Model" func={handleVehicleModelChange}/>
      </Box> 
      <Box py={2} display={'flex'} gap={'6px'}>
        <AppInput icon={<MdFingerprint color='gray.300' size='20' />} type="text" label="Password" func={handlePasswordChange}/>
      </Box>
    </ModalBody>
    <Center my={6}>
          <Button  
              isLoading={loading}
              loadingText='Please wait ...'  
              onClick={handleSubmit} 
              bg="#000" 
              w='60%' 
              color="white" 
              borderRadius={2} 
              py={5} 
              _hover={{ bg: '#171923' }}>
            Save
          </Button>
      </Center>
  </>

  const deleteDriverBody =   <>
  <ModalHeader>Delete Driver Data</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    <Center>
      <Box>
        <Icon as={MdWarningAmber} w='20' h='20' color='#DA0B2C'></Icon>
      </Box>
    </Center>
    <Center>
      <Text>Are you sure you want to delete this data</Text>
    </Center>
    </ModalBody>
    <Center my={6}>
       <Button  
          isLoading={loading}
          loadingText='Please wait ...'  
          onClick={deleteDriver}  
          bg="#000" 
          w='60%' 
          color="white" 
          borderRadius={2} 
          py={5}
          _hover={{ bg: '#171923' }}>
          Delete
        </Button>
    </Center>
  
</>

const editDriverBody =  <>
  <ModalHeader>Edit Driver</ModalHeader>
  <ModalCloseButton />
  <ModalBody>
  <Box py={2} display={'flex'} gap={'6px'} >
    <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label={firstName || ''} func={handleFirstNameChange}/>
    <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label={lastName || ''} func={handleLastNameChange}/>
  </Box> 
  <Box py={2} display={'flex'} gap={'6px'}>
    <AppInput icon={<MdPhone color='gray.300' size='20' />} type="text" label={phone || ''} func={handlePhoneChange}/>
    <AppInput icon={<MdOutlineEmail color='gray.300' size='20' />} type="text" label={email || ''} func={handleEmailChange}/>
  </Box> 
  <Box py={2} display={'flex'} gap={'6px'}>
    <TypeSelect label={type || ''} func={handleTypeChange}/>
    <AppInput  icon={<MdTimeToLeave color='gray.300' size='20' />} type="text" label={vehicleNumber || ''} func={handleVehicleNumberChange}/>
  </Box> 
  <Box py={2} display={'flex'} gap={'6px'}>
    <AppInput icon={<MdTimeToLeave color='gray.300' size='20' />} type="text" label={vehicleColor || ''} func={handleVehicleColorChange}/>
    <AppInput icon={<MdTimeToLeave color='gray.300' size='20' />} type="text" label={vehicleModel || ''} func={handleVehicleModelChange}/>
  </Box> 
  <Box py={2} display={'flex'} gap={'6px'}>
    <AppInput icon={<MdFingerprint color='gray.300' size='20' />} type="text" label={password} func={handlePasswordChange}/>
  </Box>
  </ModalBody>
  <Center my={6}>
      <Button  
          isLoading={loading}
          loadingText='Please wait ...'   
          onClick={handleEditSubmit} 
          bg="#000" 
          w='60%' 
          color="white" 
          borderRadius={2} 
          py={5} 
          _hover={{ bg: '#171923' }}>
        Save
      </Button>
  </Center>
  </>

useEffect(() => {
  // const {email, password, firstName, lastName} = data
  setEmail(data?.email)
  setPassword(data?.password)
  setFirstName(data?.firstName)
  setLastName(data?.lastName)
  setPhone(data?.phone)
  setType(data?.type)
  setVehicleNumber(data?.vehicleNumber)
  setVehicleColor(data?.vehicleColor)
  setVehicleModel(data?.vehicleModel)

 }, [data]) 

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
       {/* {body} */}
       {body === 'add' ? addDriverBody : (body === 'edit' ? editDriverBody : deleteDriverBody)}
    </ModalContent>
  </Modal>
  )
}

export default AppModal