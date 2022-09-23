import React, { Dispatch, SetStateAction } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
  Button,
  ToastId,
  Image
} from '@chakra-ui/react'
import { MdDeleteForever, MdEdit } from 'react-icons/md'

type advert = {
  advertId: string
  index: number
  description: string
  imageUrl: string
}

type ChildrenProps = {
  onOpen: () => void
  onClose: () => void
  advertsData?: any[]
  setModalBody: Dispatch<SetStateAction<string>>
  setId: Dispatch<SetStateAction<string>>
  setData: Dispatch<SetStateAction<advert | undefined>>
  showMessage: ({ status, message, title }: {
    title: string;
    message: string;
    status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}) => ToastId
}


const AdvertsTable = ({onOpen, advertsData, setModalBody, setId, setData}: ChildrenProps) => {

  const adverts = advertsData?.map(advert => {
    return {
      advertId: advert.id,
      index: advert.index || '',
      description: advert.description || '',
      imageUrl: advert.imageUrl || '',
    }
  })

  const showEdit = (advert: advert) => {
    setModalBody('edit')
    setId(advert.advertId)
    setData(advert)
    onOpen()
  }

  const showDelete = (advertId: string) => {
    setModalBody('delete')
    setId(advertId)
    onOpen()
  }

  const driverItems = adverts?.map(menu => {
    return (
      <>
        <Tr>
         <Td>{menu.index}</Td>
          <Td>
          <Image
              boxSize='100px'
              objectFit='cover'
              src={menu.imageUrl}
              alt='Advert'
            />
          </Td>
            
            <Td>{menu.description}</Td>
            <Td>
              <Button onClick={() => {showEdit(menu)}} bg='white'  cursor={'pointer'} display='inline' px={1}>
                <Icon as={MdEdit} w={'18px'} h={'18px'} />
              </Button>
              <Button onClick={() => {showDelete(menu.advertId)}} display='inline' px={1} bg='white'>
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
                <Th>Index</Th>
                <Th>Image</Th>
                <Th>Advert Description</Th>
                <Th>Actions</Th>
                {/* <Th isNumeric>multiply by</Th> */}
              </Tr>
            </Thead>
            <Tbody>
             {driverItems}
            </Tbody>
          </Table>
        </TableContainer>
    </>
  )
}

export default AdvertsTable