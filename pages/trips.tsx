import { ReactElement, useEffect } from 'react'
import { useState } from 'react'
import { Box, Text, useDisclosure, useToast, Button, Spacer, Center, ModalHeader, ModalCloseButton, ModalBody, Grid } from '@chakra-ui/react'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import type { NextPageWithLayout } from './_app'
import Navbar from '../components/Navigation/navbar'
import AppModal from '../components/Modal'
import { MdPerson, MdPhone } from 'react-icons/md'
import AppInput from '../components/AppInput'
import RidersTable from '../components/RiderTable'
import RecentRides from '../components/RecentRides'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase'



const Riders: NextPageWithLayout = () => {
  const [trips, setTrips] = useState<any[]>()
  const [modalBody, setModalBody] = useState(<></>)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const getTrips = () => {
    const trips: any[] = []
    const starCountRef = ref(db, 'rideRequest/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key]);
            const updatedData = {...data[key], id: key}
            console.log('Updated Data') 
            console.log(updatedData)
            trips.push(updatedData);
            console.log(trips.length)
        }
    }
    setTrips(trips)
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

  const saveDriver = () => {
    showMessage({title: 'Success', status: 'success', message: 'Rider Created successfully'})
    onClose()
  }

  const showAdd = () => {
    setModalBody(
      <>
       <ModalHeader>Create New Trip</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Box py={2} display={'flex'} gap={'6px'} >
          <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label="First Name" func={()=>{}}/>
        </Box> 
        <Box py={2} display={'flex'} gap={'6px'} >
          <AppInput icon={<MdPerson color='gray.300' size='20' />} type="text" label="Last Name" func={()=>{}}/>
        </Box> 
        <Box py={2} display={'flex'} gap={'6px'}>
          <AppInput icon={<MdPhone color='gray.300' size='20' />} type="number" label="Phone Nunmber" func={()=>{}}/>
        </Box> 
      </ModalBody>
      <Center my={6}>
           <Button onClick={saveDriver} bg="#000" w='60%' color="white" borderRadius={2} py={5} _hover={{ bg: '#171923' }}>
              Save
            </Button>
        </Center>
    </>
    )
    onOpen()
  }

  useEffect(() => {
    getTrips()
   }, []) 
  
  return (
    <>
     <Box bg='#fff' h='100vh'>
       <Navbar page="Rider" />
       <Box px={6} mt={8}>
        <Box display={{md: 'flex'}}>
          <Text mb={4} fontSize='16px' fontWeight='500'>Ride Requests / Trips</Text>
          <Spacer></Spacer>
          {/* <Box>
            <Button onClick={showAdd}bg="#000" color="white" borderRadius={2} py={5} _hover={{ bg: '#171923' }} leftIcon={<MdAdd />}>
              Add New Rider
            </Button>
          </Box> */}
        </Box>
          <Grid w='100%' h='auto' bg='white'
               my={8}
               py={4}
               px={4}
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
            <RecentRides tripsData={trips}/>
          </Grid>
       </Box>
      </Box>
      {/* <AppModal onClose={onClose} isOpen={isOpen} body={modalBody} /> */}
    </>
  )

}

Riders.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
   
  )
}

export default Riders
