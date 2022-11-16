import { ReactElement, useEffect } from 'react'
import { useState } from 'react'
import { Box, Text, useDisclosure, useToast, Button, Spacer, Center, Icon, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import type { NextPageWithLayout } from './_app'
import Navbar from '../components/Navigation/navbar'
import { MdAdd } from 'react-icons/md'
import RidersTable from '../components/RiderTable'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase'
import RiderModal from '../components/RiderModal'

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

const Riders: NextPageWithLayout = () => {
  const [data, setData] = useState<rider | undefined>()
  const [riders, setRiders] = useState<any[]>()
  const [modalBody, setModalBody] = useState('')
  const [id, setId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const getRiders = () => {
    let riders: any[] = []
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key]);
            const updatedData = {...data[key], id: key}
            console.log('Updated Driver Data') 
            console.log(updatedData)
            riders.push(updatedData);
            console.log(riders.length)
        }
    }
    setRiders(riders)
    riders = []
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
    setModalBody('add')
    onOpen()
  }

  useEffect(() => {
    getRiders()
   }, []) 
  
  return (
    <>
     <Box bg='#fff' h='100vh'>
       <Navbar page="Rider" />
       <Box px={6} mt={8}>
        <Box display={{md: 'flex'}}>
          <Text mb={4} fontSize='16px' fontWeight='500'>Riders Data</Text>
          <Spacer></Spacer>
          <Box>
            <Button onClick={showAdd}bg="#000" color="white" borderRadius={2} py={5} _hover={{ bg: '#171923' }} leftIcon={<MdAdd />}>
              Add New Rider
            </Button>
          </Box>
        </Box>
          <Box w='100%' h='auto' bg='white'
               my={8}
               py={4}
               px={4}
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
            <RidersTable ridersData={riders} onOpen={onOpen} setModalBody={setModalBody} setId={setId} setData={setData} showMessage={showMessage} onClose={onClose} />
          </Box>
       </Box>
      </Box>
      <RiderModal onClose={onClose} isOpen={isOpen} body={modalBody} modalType='add' id={id} data={data} />
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
