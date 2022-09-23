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
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ToastId,
  Image
} from '@chakra-ui/react'
import { MdDeleteForever, MdEdit, MdFingerprint, MdFormatListNumberedRtl, MdOutlineEmail, MdOutlineTextFormat, MdPerson, MdPhone, MdPhotoCamera, MdSubject, MdTimeToLeave, MdWarningAmber } from 'react-icons/md'
import AppInput from './AppInput'

type message = {
  messageId: string
  title: string
  content: string
}

type ChildrenProps = {
  onOpen: () => void
  onClose: () => void
  messagesData?: any[]
  setModalBody: Dispatch<SetStateAction<string>>
  setId: Dispatch<SetStateAction<string>>
  setData: Dispatch<SetStateAction<message | undefined>>
  showMessage: ({ status, message, title }: {
    title: string;
    message: string;
    status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}) => ToastId
}


const MessagesTable = ({onOpen, messagesData, setModalBody, setId, setData, showMessage, onClose}: ChildrenProps) => {

  const messages = messagesData?.map(message => {
    return {
      messageId: message.id,
      title: message.title || '',
      content: message.content || '',
    }
  })

  const editMessage = () => {
    showMessage({title: 'Success', status: 'success', message: 'Message Edited successfully'})
    onClose()
  }

  const deleteMessage = () => {
    showMessage({title: 'Success', status: 'success', message: 'Message deleted successfully'})
    onClose()
  }

  type driver = {
    messageId: string
    title: string
    content: string
  }

  const showEdit = (message: message) => {
    setModalBody('edit')
    setId(message.messageId)
    setData(message)
    onOpen()
  }

  const showDelete = (messageId: string) => {
    setModalBody('delete')
    setId(messageId)
    onOpen()
  }

  const messageItems = messages?.map(menu => {
    return (
      <>
        <Tr>
         <Td>{menu.title}</Td>
            <Td>{menu.content}</Td>
            <Td>
              <Button onClick={() => {showEdit(menu)}} bg='white'  cursor={'pointer'} display='inline' px={1}>
                <Icon as={MdEdit} w={'18px'} h={'18px'} />
              </Button>
              <Button onClick={() => {showDelete(menu.messageId)}} display='inline' px={1} bg='white'>
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
                <Th>Title</Th>
                <Th>Content</Th>
                <Th>Actions</Th>
                {/* <Th isNumeric>multiply by</Th> */}
              </Tr>
            </Thead>
            <Tbody>
             {messageItems}
            </Tbody>
          </Table>
        </TableContainer>
    </>
  )
}

export default MessagesTable