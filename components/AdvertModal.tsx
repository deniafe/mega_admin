import { Box, Button, Center, Icon, Modal, Text, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast, useNumberInput, HStack, Input, Progress } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { MdExposurePlus1, MdOutlineTextFormat, MdPhotoCamera, MdSubject, MdWarningAmber } from 'react-icons/md'
import AppInput from './AppInput'
import { push, ref, remove, update } from "firebase/database";
import { getDownloadURL, getStorage, ref as storef, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { db, storage } from '../firebase'


type advert = {
  advertId: string
  index: number
  description: string
  imageUrl: string
}

type ChildrenProps = {
  onClose: () => void
  isOpen: boolean
  body: string
  modalType: string
  id?: string
  data?: advert
}

const RiderModal = ({onClose, isOpen, body, id, data }: ChildrenProps) => {

  const [index, setIndex] = useState<number>()
  const [description, setDescription] = useState<string>()
  const [imageUrl, setImageUrl] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(0)
  const toast = useToast()

  const inputElement = useRef();

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
  useNumberInput({
    step: 0.01,
    defaultValue: 1.53,
    min: 1,
    max: 6,
    precision: 2,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  const showMessage = ({status, message, title}: {title: string, message: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined}) =>
  toast({
    title: title,
    position: 'top-right',
    description: message,
    status: status,
    duration: 9000,
    isClosable: true,
  })

  
  const handleIndexChange = (event: {target: {value: string}}) =>  {
    setIndex(parseInt(event.target.value))
  }

  const handleDescriptionChange = (event: {target: {value: string}}) =>  {
    setDescription(event.target.value)
  }

  const handleImageUrlChange = (event: {target: {value: string, files?: any}}) =>  {
    
    console.log('We keep letting him', event.target.files[0].name)
    const name = event.target.files[0].name 
    const file = event.target.files[0]

    const storageRef = storef(storage, 'adverts/' + name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setUploading(progress)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        setUploading(0)
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImageUrl(downloadURL)
        });
      }
      );
    
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   setUploading(false)
    //   console.log('Uploaded a blob or file!');
    //    // Upload completed successfully, now we can get the download URL
    //     getDownloadURL(snapshot.ref).then((downloadURL) => {
    //       console.log('File available at', downloadURL);
    //     });
    // });
  }

   const handleSubmit = (e: { preventDefault: () => void; }) => {
     e.preventDefault()
     
     if(!index || !description || !imageUrl) { 
       return  showMessage({
        title: 'Error',
        message: 'All fields are required',
        status: 'error'
      })
     }
     saveAdvert()
   }

   const handleEditSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    
    if(!index || !description || !imageUrl) { 
      return  showMessage({
       title: 'Error',
       message: 'All fields are required',
       status: 'error'
     })
    }
    editAdvert()
  }

  const saveAdvert = () => {
    setLoading(true)
    push(ref(db, 'adverts/'), {
      index,
      description,
      imageUrl,
    }).then(() => {
      setLoading(false)
      showMessage({title: 'Success', status: 'success', message: 'Advert added successfully'})
      onClose()
    })
    .catch((error) => {
      setLoading(false)
      showMessage({title: 'Error', status: 'error', message: error.message})
      onClose()
    });
  }

  const editAdvert = () => {
    setLoading(true)
    update(ref(db, 'adverts/' + id), {
      index,
      description,
      imageUrl,
    }).then(() => {
      setLoading(false)
      showMessage({title: 'Success', status: 'success', message: 'Advert updated successfully'})
      onClose()
    })
    .catch((error) => {
      setLoading(false)
      showMessage({title: 'Error', status: 'error', message: error.message})
      onClose()
    });
  }

  const deleteAdvert = () => {
    setLoading(true)
    remove(ref(db, 'adverts/' + id)).then(() => {
      setLoading(false)
      showMessage({title: 'Success', status: 'success', message: 'Advert deleted successfully'})
      onClose()
    })
    .catch((error) => {
      setLoading(false)
      showMessage({title: 'Error', status: 'error', message: error.message})
      onClose()
    });
  }

  const addAdvertBody =  <>

    <ModalHeader>Create New Advert</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    <Box py={2} display={'flex'} gap={'6px'} >
      <AppInput ref={inputElement} icon={<MdExposurePlus1 color='gray.300' size='20' />} type="text" label="Index" func={handleIndexChange}/>
    </Box> 
    <Box py={2} display={'flex'} gap={'6px'}>
      <AppInput icon={<MdSubject color='gray.300' size='20' />} type="text" label="Description" func={handleDescriptionChange}/>
    </Box>
    <Box py={2} gap={'6px'}>
      <AppInput icon={<MdPhotoCamera color='gray.300' size='20' />} type="file" label="Upload Advert Image" func={handleImageUrlChange}/>
      <Progress display={uploading ? 'block' : 'none'} value={uploading} size='xs' color='#333' />
      <Text display={uploading ? 'block' : 'none'}>Image uploading ...</Text>
    </Box> 
    </ModalBody>
    <Center my={6}>
        <Button 
          isDisabled={!!uploading}
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

  const deleteAdvertBody =   <>
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
          onClick={deleteAdvert}  
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

const editAdvertBody =  <>

<ModalHeader>Edit Advert</ModalHeader>
<ModalCloseButton />
<ModalBody>
<Box py={2} display={'flex'} gap={'6px'} >
  <AppInput icon={<MdExposurePlus1 color='gray.300' size='20' />} type="number" label={index?.toString()} func={handleIndexChange}/>
</Box> 
<Box py={2} display={'flex'} gap={'6px'}>
  <AppInput icon={<MdSubject color='gray.300' size='20' />} type="text" label={description} func={handleDescriptionChange}/>
</Box>
<Box py={2} display={'flex'} gap={'6px'}>
  <AppInput icon={<MdPhotoCamera color='gray.300' size='20' />} type="file" label="Upload Advert Image" func={handleImageUrlChange}/>
  <Progress display={uploading ? 'block' : 'none'} value={uploading} size='xs' color='#333' />
  <Text display={uploading ? 'block' : 'none'}>Image uploading ...</Text>
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
  setIndex(data?.index)
  setDescription(data?.description)
  setImageUrl(data?.imageUrl)

 }, [data]) 

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
       {/* {body} */}
       {body === 'add' ? addAdvertBody : (body === 'edit' ? editAdvertBody : deleteAdvertBody)}
    </ModalContent>
  </Modal>
  )
}

export default RiderModal