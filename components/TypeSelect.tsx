/* eslint-disable react/no-children-prop */
import {Select } from '@chakra-ui/react'
import React from 'react'

type ChildrenProps = {
  label?: string
  value?: string
  ref?: any
  func: (event: {
    target: {
        value: string;
        files?: any
    };
}) => void
}

const AppSelectInput = ({label, func, value, ref} : ChildrenProps) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
  
      <Select 
      ref={ref}
      onChange={func} 
      value={value} 
      variant='filled' 
      isRequired 
      focusBorderColor='#000'
      placeholder={label}
      borderRadius={2}  
      border='1px solid' 
      bg="#fafafa" 
      _hover={{ bg: '#F7FAFC' }}
      >
        <option value='Go'>Go</option>
        <option value='Exclusive'>Exclusive</option>
        <option value='Multi'>Multi</option>
      </Select>
    
  )
}

export default AppSelectInput