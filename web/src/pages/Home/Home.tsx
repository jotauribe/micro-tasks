import React from 'react'
import styled from 'styled-components'

import Text from '@components/Typography'
import Container from '@components/Container'

import Users from './Users'

const MainContainer = styled(Container)`
    height: 100vh;
    width: 100vw;
    background-color: #f1f3f4;
`

const Header = styled(Container)`
    height: 50px;
    width: 100%;
    background-color: white;
    box-shadow: 0px 2px 32px -15px rgba(0, 0, 0, 0.25);
`

function Home() {
    return (
        <MainContainer vertical>
            <Header centered padded>
                <Text large bold>
                    MicroTasks
                </Text>
            </Header>
            <Container padded>
                <Users />
            </Container>
        </MainContainer>
    )
}

export default Home
