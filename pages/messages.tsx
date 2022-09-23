import { ReactElement, useEffect } from 'react'
import { useState } from 'react'
import { Box, Text, useDisclosure, useToast, Button, Spacer, Center, Icon, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import type { NextPageWithLayout } from './_app'
import Navbar from '../components/Navigation/navbar'
import { MdAdd, MdFormatListNumberedRtl, MdOutlineTextFormat, MdPhotoCamera, MdSubject } from 'react-icons/md'
import DriversTable from '../components/DriverTable'
import AppModal from '../components/Modal'
import { MdFingerprint, MdOutlineEmail, MdPerson, MdPhone, MdTimeToLeave } from 'react-icons/md'
import AppInput from '../components/AppInput'
import RidersTable from '../components/RiderTable'
import MessageTable from '../components/MessageTable'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase'
import MessageModal from '../components/MessageModal'

type message = {
  messageId: string
  title: string
  content: string
}


const Messages: NextPageWithLayout = () => {
  const [data, setData] = useState<message | undefined>()
  const [messages, setMessages] = useState<any[]>()
  const [modalBody, setModalBody] = useState('')
  const [id, setId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const getMessages = () => {
    let messages: any[] = []
    const starCountRef = ref(db, 'messages/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key]);
            const updatedData = {...data[key], id: key}
            console.log('Updated Driver Data') 
            console.log(updatedData)
            messages.push(updatedData);
            console.log(messages.length)
        }
    }
    setMessages(messages)
    messages = []
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

  const saveMessage = () => {
    showMessage({title: 'Success', status: 'success', message: 'Message Created successfully'})
    onClose()
  }

  const showAdd = () => {
    setModalBody('add')
    onOpen()
  }

  useEffect(() => {
    getMessages()
   }, []) 
  
  return (
    <>
     <Box bg='#fff' h='100vh'>
       <Navbar page="Rider" />
       <Box px={6} mt={8}>
        <Box display={{md: 'flex'}}>
          <Text mb={4} fontSize='16px' fontWeight='500'>Mega Connect Messages</Text>
          <Spacer></Spacer>
          <Box>
            <Button onClick={showAdd}bg="#000" color="white" borderRadius={2} py={5} _hover={{ bg: '#171923' }} leftIcon={<MdAdd />}>
              Add New Message
            </Button>
          </Box>
        </Box>
          <Box w='100%' h='auto' bg='white'
               my={8}
               py={4}
               px={4}
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
            <MessageTable messagesData={messages} onOpen={onOpen} setModalBody={setModalBody} setId={setId} setData={setData} showMessage={showMessage} onClose={onClose} />
          </Box>
       </Box>
      </Box>
      <MessageModal onClose={onClose} isOpen={isOpen} body={modalBody} modalType='add' id={id} data={data} />
    </>
  )

}

Messages.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
   
  )
}

export default Messages
