import { Box, Button, Center, Icon, Modal, Text, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { MdFingerprint, MdOutlineEmail, MdPerson, MdPhone, MdTimeToLeave, MdWarningAmber } from 'react-icons/md'
import AppInput from './AppInput'
import AppSelectInput from './AppSelectInput'


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
  onClose: () => void
  isOpen: boolean
  body: string
  modalType: string
  id?: string
  data?: rider
}

const RiderModal = ({onClose, isOpen, body, id, data }: ChildrenProps) => {

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>(); 
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>(); 
  const [phone, setPhone] = useState<string>();
  const [membership, setMembership] = useState<string>();
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

  
  const handleFirstNameChange = (event: {target: {value: string}}) =>  {
    console.log('First Name', event.target.value )
    setFirstName(event.target.value)
    console.log('fields', firstName)
  }

  const handleLastNameChange = (event: {target: {value: string}}) =>  {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event: {target: {value: string}}) =>  {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: {target: {value: string}}) =>  {
    setPassword(event.target.value)
  }

  const handlePhoneChange = (event: {target: {value: string}}) =>  {
    setPhone(event.target.value)
  }

  const handleMembershipChange = (event: {target: {value: string}}) =>  {
    setMembership(event.target.value)
  }

   const handleSubmit = (e: { preventDefault: () => void; }) => {
     e.preventDefault()
     
     if(!firstName || !lastName || !phone || !password || !email){ 
       return  showMessage({
        title: 'Error',
        message: 'All fields are required',
        status: 'error'
      })
     }
     saveRider()
   }

   const handleEditSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    console.log('fields', firstName, lastName, phone)
    
    if(!firstName || !lastName || !phone || !password || !email){
      return  showMessage({
       title: 'Error',
       message: 'All fields are required',
       status: 'error'
     })
    }
    editRider()
  }

  const saveRider = () => {
    setLoading(true)
    axios.post('https://us-central1-turing-audio-349909.cloudfunctions.net/api/users', {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      password: password,
      email: email,
      membership: membership,
      imageUrl: "",
    })
    .then(function (response) {
      setLoading(false)
      console.log(response);
      showMessage({title: 'Success', status: 'success', message: 'Rider added successfully'})
      onClose()
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error);
      showMessage({title: 'Error', status: 'error', message: error.response.data.message})
      onClose()
    });
  }

  const editRider = () => {
    setLoading(true)
    axios.patch('https://us-central1-turing-audio-349909.cloudfunctions.net/api/users/'+ id, {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      phone: phone,
      membership: membership,
      imageUrl: "",
    })
    .then(function (response) {
      setLoading(false)
      console.log(response);
      showMessage({title: 'Success', status: 'success', message: 'Rider updated successfully'})
      onClose()
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error);
      showMessage({title: 'Error', status: 'error', message: error.response.data.message})
      onClose()
    });
  }

  const deleteRider = () => {
    setLoading(true)
    axios.delete('https://us-central1-turing-audio-349909.cloudfunctions.net/api/users/'+ id)
    .then(function (response) {
      setLoading(false)
      console.log(response);
      showMessage({title: 'Success', status: 'success', message: 'Rider deleted successfully'})
      onClose()
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error);
      showMessage({title: 'Error', status: 'error', message: error.message})
      onClose()
    });
  }

  const addRiderBody =  <>
      <ModalHeader>Add New Rider</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <Box py={2} display={'flex'} gap={'6px'} >
        <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label="First Name" func={handleFirstNameChange}/>
      </Box> 
      <Box py={2} display={'flex'} gap={'6px'}>
        <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label="Last Name" func={handleLastNameChange}/>
      </Box> 
      <Box py={2} display={'flex'} gap={'6px'}>
       <AppInput icon={<MdOutlineEmail color='gray.300' size='20' />} type="text" label="Email" func={handleEmailChange}/>
       <AppInput icon={<MdFingerprint color='gray.300' size='20' />} type="text" label="Password" func={handlePasswordChange}/>
      </Box> 
      
      <Box py={2} display={'flex'} gap={'6px'}>
       <AppInput icon={<MdPhone color='gray.300' size='20' />} type="text" label="Phone Number" func={handlePhoneChange}/>
       <AppSelectInput label="Select Membership" func={handleMembershipChange}/>
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

  const deleteRiderBody =   <>
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
          onClick={deleteRider}  
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

const editRiderBody =  <>
   <ModalHeader>Edit Rider</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Box py={2} display={'flex'} gap={'6px'} >
          <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label={firstName} func={handleFirstNameChange}/>
        </Box> 
        <Box py={2} display={'flex'} gap={'6px'}>
          <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label={lastName} func={handleLastNameChange}/>
        </Box>
        <Box py={2} display={'flex'} gap={'6px'}>
       <AppInput icon={<MdOutlineEmail color='gray.300' size='20' />} type="text" label={email} func={handleEmailChange}/>
       <AppInput icon={<MdFingerprint color='gray.300' size='20' />} type="text" label={password} func={handlePasswordChange}/>
      </Box> 
        <Box py={2} display={'flex'} gap={'6px'}>
          <AppInput icon={<MdPhone color='gray.300' size='20' />} type="number" label={phone} func={handlePhoneChange}/>
          <AppSelectInput label={membership} func={handleMembershipChange}/>
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
  setFirstName(data?.firstName)
  setLastName(data?.lastName)
  setEmail(data?.email)
  setPassword(data?.password)
  setMembership(data?.membership)
  setPhone(data?.phone)

 }, [data]) 

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
       {/* {body} */}
       {body === 'add' ? addRiderBody : (body === 'edit' ? editRiderBody : deleteRiderBody)}
    </ModalContent>
  </Modal>
  )
}

export default RiderModal