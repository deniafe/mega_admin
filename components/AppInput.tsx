/* eslint-disable react/no-children-prop */
import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { IconType } from 'react-icons'
import { MdOutlineEmail } from 'react-icons/md'

type ChildrenProps = {
  type?: string
  icon?: ReactNode
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

const AppInput = ({icon, type, label, func, value, ref} : ChildrenProps) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        children={icon}
       
      />
      <Input ref={ref} onChange={func} value={value} type={type} variant='filled' isRequired focusBorderColor='#000'  borderRadius={2}  border='1px solid' bg="#fafafa" _hover={{ bg: '#F7FAFC' }}  placeholder={label} />
    </InputGroup>
  )
}

export default AppInput