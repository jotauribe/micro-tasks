import React from 'react'
import styled from 'styled-components'

import Text from '@components/Typography'
import Container from '@components/Container'
import usersService from '@services/users.service'
import tasksService from '@services/tasks.service'
import useAsyncService from '@hooks/useAsyncService'

import Users from './Users'
import Tasks from './Tasks'

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

const Content = styled(Container)`
    height: calc(100% - 50px);
    gap: 15px;
`

const TaskSectionWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: white;
    box-shadow: 0px 2px 32px -15px rgba(0, 0, 0, 0.25);
`

function Home() {
    const [findUsers, users] = useAsyncService(usersService.getAll, { runOnMount: true })
    const [findTasks, tasks] = useAsyncService(tasksService.find, { runOnMount: true })

    const findUserTasks = user => findTasks({ ownerId: user.id })

    return (
        <MainContainer vertical>
            <Header centered padded>
                <Text large bold>
                    MicroTasks
                </Text>
            </Header>
            <Content padded>
                <Users
                    users={users.data}
                    onSelectUser={findUserTasks}
                    updateUsersLocally={users.updateLocally}
                />
                <TaskSectionWrapper>
                    <Tasks tasks={tasks.data} updateTasksLocally={tasks.updateLocally} />
                </TaskSectionWrapper>
            </Content>
        </MainContainer>
    )
}

export default Home
