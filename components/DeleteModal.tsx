import { Button, Center, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import { MdWarningAmber } from 'react-icons/md'

type ChildrenProps = {
  onClose: () => void
  isOpen: boolean
  title: string
}

const DeleteModal = ({onClose, isOpen, title }: ChildrenProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Center>
          <Icon as={MdWarningAmber} size={'large'} color='DA0B2C'></Icon>
          <Text>Are you sure you want to delete</Text>
        </Center>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default DeleteModal