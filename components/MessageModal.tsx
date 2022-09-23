import { Box, Button, Center, Icon, Modal, Text, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdOutlineTextFormat, MdSubject, MdWarningAmber } from 'react-icons/md'
import AppInput from './AppInput'
import { push, ref, remove, set, update } from "firebase/database";
import { db } from '../firebase'


type message = {
  messageId: string
  title: string
  content: string
}

type ChildrenProps = {
  onClose: () => void
  isOpen: boolean
  body: string
  modalType: string
  id?: string
  data?: message
}

const RiderModal = ({onClose, isOpen, body, id, data }: ChildrenProps) => {

  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>(); 
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

  
  const handleTitleChange = (event: {target: {value: string}}) =>  {
    console.log('First Name', event.target.value )
    setTitle(event.target.value)
    console.log('fields', title)
  }

  const handleContentChange = (event: {target: {value: string}}) =>  {
    setContent(event.target.value)
  }

   const handleSubmit = (e: { preventDefault: () => void; }) => {
     e.preventDefault()
     
     if(!title || !content) { 
       return  showMessage({
        title: 'Error',
        message: 'All fields are required',
        status: 'error'
      })
     }
     saveMessage()
   }

   const handleEditSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    
    if(!title || !content){
      return  showMessage({
       title: 'Error',
       message: 'All fields are required',
       status: 'error'
     })
    }
    editMessage()
  }

  const saveMessage = () => {
    setLoading(true)
    push(ref(db, 'messages/'), {
      title,
      content,
    }).then(() => {
      setLoading(false)
      showMessage({title: 'Success', status: 'success', message: 'Message added successfully'})
      onClose()
    })
    .catch((error) => {
      setLoading(false)
      showMessage({title: 'Error', status: 'error', message: error.message})
      onClose()
    });
  }

  const editMessage = () => {
    setLoading(true)
    update(ref(db, 'messages/' + id), {
      title,
      content,
    }).then(() => {
      setLoading(false)
      showMessage({title: 'Success', status: 'success', message: 'Message updated successfully'})
      onClose()
    })
    .catch((error) => {
      setLoading(false)
      showMessage({title: 'Error', status: 'error', message: error.message})
      onClose()
    });
  }

  const deleteMessage = () => {
    setLoading(true)
    remove(ref(db, 'messages/' + id)).then(() => {
      setLoading(false)
      showMessage({title: 'Success', status: 'success', message: 'Message deleted successfully'})
      onClose()
    })
    .catch((error) => {
      setLoading(false)
      showMessage({title: 'Error', status: 'error', message: error.message})
      onClose()
    });
  }

  const addMessageBody =  <>

    <ModalHeader>Create New Message</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <Box py={2} display={'flex'} gap={'6px'} >
        <AppInput icon={<MdOutlineTextFormat color='gray.300' size='20' />} type="text" label="Title" func={handleTitleChange}/>
      </Box> 
      <Box py={2} display={'flex'} gap={'6px'}>
        <AppInput icon={<MdSubject color='gray.300' size='20' />} type="text" label="Content" func={handleContentChange}/>
      </Box>
    </ModalBody>
    <Center my={6}>
          <Button isLoading={loading}
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

  const deleteMessageBody =   <>
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
          onClick={deleteMessage}  
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

const editMessageBody =  <>

  <ModalHeader>Edit Message</ModalHeader>
  <ModalCloseButton />
  <ModalBody>
  <Box py={2} display={'flex'} gap={'6px'} >
    <AppInput icon={<MdOutlineTextFormat color='gray.300' size='20' />} type="text" label={title} func={handleTitleChange}/>
  </Box> 
  <Box py={2} display={'flex'} gap={'6px'}>
    <AppInput icon={<MdSubject color='gray.300' size='20' />} type="text" label={content} func={handleContentChange}/>
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
  setTitle(data?.title)
  setContent(data?.content)

 }, [data]) 

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
       {/* {body} */}
       {body === 'add' ? addMessageBody : (body === 'edit' ? editMessageBody : deleteMessageBody)}
    </ModalContent>
  </Modal>
  )
}

export default RiderModal