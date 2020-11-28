import React from 'react'
import styled from 'styled-components'
import { first } from 'lodash/fp'

import Text from '@components/Typography'

const Container = styled.div`
    display: flex;
    padding: 8px;
    height: 46px;
    width: 46px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgb(222, 224, 229);
`

const Avatar = ({ name: fullName }) => {
    const names = fullName.split(' ')
    const initials = names.map(first).join('')

    return (
        <Container>
            <Text>{initials}</Text>
        </Container>
    )
}

export default Avatar
