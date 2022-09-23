import { ReactElement, useEffect } from 'react'
import { useState } from 'react'
import { Box, Text, useDisclosure, useToast, Button, Spacer } from '@chakra-ui/react'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import type { NextPageWithLayout } from './_app'
import Navbar from '../components/Navigation/navbar'
import { MdAdd } from 'react-icons/md'
import AdvertTable from '../components/AdvertTable'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase'
import AdvertModal from '../components/AdvertModal'

type advert = {
  advertId: string
  index: number
  description: string
  imageUrl: string
}

const Adverts: NextPageWithLayout = () => {
  const [data, setData] = useState<advert | undefined>()
  const [adverts, setAdverts] = useState<any[]>()
  const [modalBody, setModalBody] = useState('')
  const [id, setId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()


  const getAdverts = () => {
    let adverts: any[] = []
    const starCountRef = ref(db, 'adverts/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key]);
            const updatedData = {...data[key], id: key}
            console.log('Updated Driver Data') 
            console.log(updatedData)
            adverts.push(updatedData);
            console.log(adverts.length)
        }
    }
    setAdverts(adverts)
    adverts = []
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

  const saveAdvert = () => {
    showMessage({title: 'Success', status: 'success', message: 'Advert Created successfully'})
    onClose()
  }

  const showAdd = () => {
    setModalBody('add')
    onOpen()
  }

  useEffect(() => {
    getAdverts()
   }, []) 
  
  
  return (
    <>
     <Box bg='#fff' h='100vh'>
       <Navbar page="Rider" />
       <Box px={6} mt={8}>
        <Box display={{md: 'flex'}}>
          <Text mb={4} fontSize='16px' fontWeight='500'>Mega Connect Adverts</Text>
          <Spacer></Spacer>
          <Box>
            <Button onClick={showAdd}bg="#000" color="white" borderRadius={2} py={5} _hover={{ bg: '#171923' }} leftIcon={<MdAdd />}>
              Add New Advert
            </Button>
          </Box>
        </Box>
          <Box w='100%' h='auto' bg='white'
               my={8}
               py={4}
               px={4}
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
            <AdvertTable advertsData={adverts} onOpen={onOpen} setModalBody={setModalBody} setId={setId} setData={setData} showMessage={showMessage} onClose={onClose} />
          </Box>
       </Box>
      </Box>
      <AdvertModal onClose={onClose} isOpen={isOpen} body={modalBody} modalType='add' id={id} data={data} />
    </>
  )

}

Adverts.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
   
  )
}

export default Adverts
