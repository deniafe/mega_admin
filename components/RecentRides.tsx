import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
  Text,
  Box
} from '@chakra-ui/react'

type ChildrenProps = {
  tripsData?: any[]
}

const RecentRides = ({tripsData}: ChildrenProps) => {

  console.log('Trips data in recent rides', tripsData)

  const trips = tripsData?.map(trip => {
    return {
      rideId: trip.id,
      driver_name: trip.driver_name || '',
      rider_name: trip.rider_name || trip.rider_phone,
      pickup_address: trip.pickup_address,
      destination_address: trip.destination_address,
      date: trip.created_at,
      status: trip.status || 'ontrip'
    }
  })

  // const trips = [
  //   {
  //     rideId: '1',
  //     driver_name: 'Dan Vester',
  //     rider_name: 'Deborah Bamidele',
  //     pickup_address: '31 Adaraloye St, Ikorodu 104102, Ikorodu, Nigeria',
  //     destination_address: 'Ikeja City Mall',
  //     date: '2022-08-16',
  //     status: 'ended'
  //   },
  //   {
  //     rideId: '1',
  //     driver_name: 'Dan Vester',
  //     rider_name: 'Deborah Bamidele',
  //     pickup_address: '31 Adaraloye St, Ikorodu 104102, Ikorodu, Nigeria',
  //     destination_address: 'Ikeja City Mall',
  //     date: '2022-08-16',
  //     status: 'ontrip'
  //   },
  //   {
  //     rideId: '1',
  //     driver_name: 'Dan Vester',
  //     rider_name: 'Deborah Bamidele',
  //     pickup_address: '31 Adaraloye St, Ikorodu 104102, Ikorodu, Nigeria',
  //     destination_address: 'Ikeja City Mall',
  //     date: '2022-08-16',
  //     status: 'cancelled'
  //   }
  // ]

  const itemTrips = trips?.map(menu => {
    return (
      <>
        <Tr>
            {/* <Td>{menu.rideId}</Td> */}
            <Td>{menu.driver_name}</Td>
            <Td>{menu.rider_name}</Td>
            <Td>
              <Box w={60}>

              <Text overflow={'hidden'} textOverflow={'ellipsis'}>
              ◾️  {menu.pickup_address}
              </Text>
              <Text overflow={'hidden'} textOverflow={'ellipsis'}>
              ◾️  {menu.destination_address}
              </Text>

              </Box>
             
              </Td>
              <Td>{menu.date}</Td>
            <Td>
            <Badge colorScheme={menu.status === 'ended' ? 'green' : (menu.status === 'ontrip' ? 'purple' : 'red')}>{menu.status}</Badge>
            </Td>
          </Tr>
      </>
    )
  })

  return (
    <>
        <TableContainer>
          <Table variant='simple'>
            <TableCaption>Recent Rides</TableCaption>
            <Thead>
              <Tr>
                {/* <Th>Ride ID</Th> */}
                <Th>Driver Name</Th>
                <Th>Rider Name</Th>
                <Th>Pick / Drop Address</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                {/* <Th isNumeric>multiply by</Th> */}
              </Tr>
            </Thead>
            <Tbody>
             {itemTrips}
            </Tbody>
          </Table>
        </TableContainer>
    </>
  )
}

export default RecentRides