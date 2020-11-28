import React from 'react'
import styled from 'styled-components'
import { BsSearch } from 'react-icons/bs'

import OriginalInput, { InputProps } from '@components/Input'
import IconButton from '@components/IconButton'

export type SearchBoxProps = Omit<InputProps, 'prefix' | 'variant'> 

const Input = styled(OriginalInput)`
    flex-direction: row;
`

const SearchBox: React.FC<SearchBoxProps> = props => {
    return (
        <Input
            {...props}
            variant="outlined"
            prefix={
                <IconButton disabled>
                    <BsSearch size="1.25em" color="gray" />
                </IconButton>
            }
        />
    )
}

export default SearchBox
