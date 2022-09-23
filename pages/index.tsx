import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Center, Stack, Button, Spacer, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import Layout from '../components/layouts/layout'
import type { NextPageWithLayout } from './_app' 
import { MdFingerprint, MdOutlineEmail } from 'react-icons/md'
import Home from '../styles/Home.module.css'
import logo from '../public/megalogo.png'
import AppInput from '../components/AppInput'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'


const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const toast = useToast()
  const [email, setEmail] = useState<string>(""); // title
  const [password, setPassword] = useState<string>("");// description
  const [loading, setLoading] = useState(false)

  const showMessage = ({status, message, title}: {title: string, message: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined}) =>
  toast({
    title: title,
    position: 'top-right',
    description: message,
    status: status,
    duration: 9000,
    isClosable: true,
  })

  const handleEmailChange = (event: {target: {value: string}}) =>  {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: {target: {value: string}}) =>  {
    setPassword(event.target.value)
  }

   const handleSubmit = (e: { preventDefault: () => void; }) => {
     e.preventDefault(); // avoid default behaviour
     
     if(!password || !email){ // check for any null value
       return  showMessage({
        title: 'Error',
        message: 'All fields are required',
        status: 'error'
      })
     }
     login()
   }


  const login = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      setLoading(false)
      const user = userCredential.user;
      showMessage({status: 'success', title: 'Success', message: 'Login successful'})
      router.push('/dashboard')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false)
      showMessage({status: 'error', title: 'Error', message: errorMessage})
  });

   
  }
  
  return (
    <>
      <Box>
        <Center>
          <Box 
            mt={{base: 20, md: 10}}
            bg="white" 
            w="360" 
            h="540"
            borderRadius={6} 
            boxShadow= 'rgba(170, 170, 170) 2px 4px 6px 2px'
            >
            <Box bg="#fafafa" borderTopRadius={6} px={32} py={4}>
              <Image
                src={logo}
                alt="Mega Connect Logo"
                height={40}
                width={110}
              />
            </Box>
            <Box mt={16} px={8}>
            <Stack spacing={4}>
              <AppInput icon={<MdOutlineEmail color='gray.300' size='20' />} type="email" label="Email" func={handleEmailChange}/>
              <AppInput icon={<MdFingerprint color='gray.300' size='20' />} type="password" label="Password" func={handlePasswordChange}/>
              <Spacer />
              <Spacer />
              <Button 
                onClick={handleSubmit} 
                isLoading={loading}
                loadingText='Please wait ...' 
                bg="#000" 
                color="white" 
                borderRadius={2} 
                py={5}
                 _hover={{ bg: '#171923' }}>
                LOGIN
              </Button>
            {/* <Input variant='filled' placeholder='Filled' /> */}
            </Stack>
            </Box>
          </Box>
        </Center>
      </Box>

    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <main className={Home.main}>
      <Layout>
        {page}
      </Layout>
      </main>
  )
}

export default Page
function toast(arg0: { title: string; position: string; description: string; status: "info" | "warning" | "success" | "error" | "loading" | undefined; duration: number; isClosable: boolean }) {
  throw new Error('Function not implemented.')
}

