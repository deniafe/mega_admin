import { ReactElement, useCallback } from 'react'
import { useState, useRef, useMemo, useEffect, useContext } from 'react'
import { Box, Grid, GridItem, Text, useDisclosure, useToast } from '@chakra-ui/react'
import Layout from '../components/layouts/layout'
import PollsLayout from '../components/layouts/polls'
import type { NextPageWithLayout } from './_app'
import Home from '../styles/Home.module.css'
import Navbar from '../components/Navigation/navbar'
import { MdCommute, MdDriveEta, MdPeople } from 'react-icons/md'
import { IoCarOutline, IoCarSharp, IoCloseCircleOutline } from 'react-icons/io5'
import DashboardCard from '../components/DashboardCard'
import { RideStatus } from '../components/RideStatus'
import { DriverStats } from '../components/DriverStats'
import RecentRides from '../components/RecentRides'
import { ref, onValue} from "firebase/database";
import { db } from '../firebase'

const Dashboard: NextPageWithLayout = () => {
  const [trips, setTrips] = useState<any[]>()
  const [drivers, setDrivers] = useState<any[]>()
  const [availableDrivers, setAvailableDrivers] = useState<any[]>()
  const [riders, setRiders] = useState<any[]>()
  const [onTrips, setOnTrips] = useState<any[]>()
  const [completedTrips, setCompletedTrips] = useState<any[]>()
  const [cancelledTrips, setCancelledTrips] = useState<any[]>()
  const [graphData, setGraphData] = useState<any[]>()
  const [graphData2, setGraphData2] = useState<any[]>()
  const [comment, setComment] = useState('');// description
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

  const getDrivers = () => {
    const drivers: any[] = []
    const starCountRef = ref(db, 'drivers/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key]);
            const updatedData = {...data[key], id: key}
            console.log('Updated Driver Data') 
            console.log(updatedData)
            drivers.push(updatedData);
            console.log(drivers.length)
        }
    }
    setDrivers(drivers)
      // console.log(data.length)
      // updateStarCount(postElement, data);
    });
  }

  const getAvailableDrivers = () => {
    const availableDrivers: any[] = []
    const starCountRef = ref(db, 'driversAvailable/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key]);
            const updatedData = {...data[key], id: key}
            console.log('Updated Driver Data') 
            console.log(updatedData)
            availableDrivers.push(updatedData);
            console.log(availableDrivers.length)
        }
    }
    setAvailableDrivers(availableDrivers)
      // console.log(data.length)
      // updateStarCount(postElement, data);
    });
  }

  const getRiders = () => {
    const riders: any[] = []
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
      // console.log(data.length)
      // updateStarCount(postElement, data);
    });
  }

  const getOntrips = () => {
    const ontrips: any[] = []
    trips?.forEach(trip => {
      if(trip.status === 'ended' || trip.status == 'cancelled') {
       return
      } else if (trip.status === 'arrived' || trip.status === 'ontrip' || trip.status === 'accepted') {
        ontrips.push(trip)
      }
    })
    setOnTrips(ontrips)
  }

  const getCompletedtrips = () => {
    const completedtrips: any[] = []
    trips?.forEach(trip => {
      if(trip.status === 'ended') {
        completedtrips.push(trip)
      }
    })
    setCompletedTrips(completedtrips)
  }

  const getCancelledtrips = () => {
    const cancelledtrips: any[] = []
    trips?.forEach(trip => {
      if(!trip.status) {
        cancelledtrips.push(trip)
      }
    })
    setCancelledTrips(cancelledtrips)
  }

  const getTripsGraphData =  () => {
    const cancelledtrips = cancelledTrips?.map(trip => {
      return {date: trip.created_at.substring(0, 10), status: trip.status}
    })
    const completedtrips = completedTrips?.map(trip => {
      return {date: trip.created_at.substring(0, 10), status: trip.status}
    })
    const ontrips = onTrips?.map(trip => {
      return {date: trip.created_at.substring(0, 10), status: trip.status}
    })
    const allTrips = trips?.map(trip => {
      return {date: trip.created_at.substring(0, 10), status: trip.status}
    })

    console.log(cancelledtrips)

    const modCancelledTrips: any[] = [] 

    const modCompletedTrips: any[] = [] 

    cancelledtrips?.forEach((trip, i) => {
      const val = trip.date
      const k = trip.date
      if(!modCancelledTrips.length) { 
        modCancelledTrips.push({[k]: 1}) 
        return
      }
      modCancelledTrips.push({[k]: 1}) 
    }) 

    completedtrips?.forEach((trip, i) => {
      const k = trip.date
      if(!modCompletedTrips.length) { 
        modCompletedTrips.push({[k]: 1}) 
        return
      }
      modCompletedTrips.push({[k]: 1}) 
    }) 

    console.log('modCancelledTrips', modCancelledTrips)

    const graphData: any[] = []
    const checked: any[] = []
    const graphData2: any[] = []
    const checked2: any[] = []

    modCancelledTrips?.forEach((modtrip, i) => { 
      // const modkey = Object.keys(modtrip)[0]
      if(!checked?.includes(Object.keys(modtrip)[0])) {
        console.log('Check', howManyTimes(modtrip, modCancelledTrips))
        graphData.push({[Object.keys(modtrip)[0]] : howManyTimes(modtrip, modCancelledTrips)})
        checked.push(Object.keys(modtrip)[0])
      }
    }) 

    modCompletedTrips?.forEach((modtrip, i) => { 
      // const modkey = Object.keys(modtrip)[0]
      if(!checked2?.includes(Object.keys(modtrip)[0])) {
        console.log('Check', howManyTimes(modtrip, modCompletedTrips))
        graphData2.push({[Object.keys(modtrip)[0]] : howManyTimes(modtrip, modCompletedTrips)})
        checked2.push(Object.keys(modtrip)[0])
      }
    }) 

    setGraphData(graphData)
    setGraphData2(graphData2)

  }

  const howManyTimes = (obj: {}, arr: any[]) => {
    let count = 0
      arr.forEach(el => { 
        console.log('object keys', Object.keys(obj)[0])
        if(Object.keys(el)[0] == Object.keys(obj)[0]) {
          count++
        }
      })
      return count
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

  useEffect(() => {
   getTrips()
   getRiders()
   getDrivers()
   getAvailableDrivers()
  //  getTripsGraphData()
  }, []) 

  useEffect(() => {
    getOntrips()
   }, [trips])

   useEffect(() => {
    getCompletedtrips()
   }, [trips])

   useEffect(() => {
    getCancelledtrips()
   }, [trips])

   useEffect(() => {
    getTripsGraphData()
   }, [completedTrips, trips])



  return (
    <>
     <Box bg='#fff'  h='100vh'>
       <Navbar page="Dashboard" />
       <Box px={6} mt={8}>
       <Text mb={4} fontSize='16px' fontWeight='500'>Ride Statistics</Text>
        <Grid templateColumns={{base:'repeat(1, 1fr)', lg: 'repeat(4, 1fr)', md: 'repeat(2, 1fr)'}} gap={6}>
            <GridItem w='100%' h='24' bg='white'  
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
                 <DashboardCard icon={MdCommute} title='Total No Of Rides' number={trips?.length.toString() || '0'} color='#2B6CB0' />
               </GridItem>
               <GridItem w='100%' h='24' bg='white'  
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
                 <DashboardCard icon={IoCarOutline} title='Running Rides' number={onTrips?.length.toString() || '0'} color='#D69E2E' />
               </GridItem>
               <GridItem w='100%' h='24' bg='white'  
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
                 <DashboardCard icon={IoCarSharp} title='Completed Rides' number={completedTrips?.length.toString() || '0'} color='#38A169' />
               </GridItem>
               <GridItem w='100%' h='24' bg='white'  
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
                 <DashboardCard icon={IoCloseCircleOutline} title='Cancelled Trips' number={cancelledTrips?.length.toString() || '0'} color='#C53030' />
               </GridItem>
          </Grid>
          <Grid templateColumns={{base:'repeat(1, 1fr)',  md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'}} gap={6} mt={8}>
            <GridItem w='100%' h={{base: 360, md: 350, lg: 320}} bg='white'
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
                <DriverStats online={availableDrivers?.length} drivers={drivers?.length} />
               </GridItem>
               <GridItem >
                <Box
                w='100%' h='24' bg='white'  
                mb={4}
                borderRadius={20} 
                boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
                   <DashboardCard icon={MdPeople} title='Total Riders' number={riders?.length.toString() || '0'} color='#319795' />
                </Box>

                <Box
                w='100%' h='24' bg='white'  
                mt={4}
                borderRadius={20} 
                boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
                   <DashboardCard icon={MdDriveEta} title='Total Drivers' number={drivers?.length.toString() || '0'} color='#553C9A' />
                </Box>
                
               </GridItem>
               <GridItem w='100%' h='320' bg='white' py='6' 
               borderRadius={20} 
               colSpan={{md:2}}
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
                 <RideStatus graphData={graphData} graphData2={graphData2}/>
               </GridItem>
          </Grid>
          <Text mt={{base: 12, md: 32, lg: 12}} mb={4} fontSize='16px' fontWeight='500'>Trip Requests</Text>
          <Grid minWidth='90%' h='auto' bg='white'
               py={4}
               px={4}
               borderRadius={20} 
               boxShadow= 'rgba(170, 170, 170, 0.20) 2px 2px 16px 0'>
            <RecentRides tripsData={trips}/>
          </Grid>
       </Box>
      </Box>
    </>
  )

}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <PollsLayout>{page}</PollsLayout>
    </Layout>
   
  )
}

export default Dashboard
