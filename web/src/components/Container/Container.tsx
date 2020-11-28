import React from 'react'
import styled, { css } from 'styled-components'

export type ContainerProps = {
    vertical?: boolean
    padded?: boolean
    spaced?: boolean
    centered?: boolean
    striped?: boolean
    hoverable?: boolean
    childrenSpacedBy?: string
}

const ifProp = (key: keyof ContainerProps, styles: any) => (props: ContainerProps) =>
    props[key] && styles

const stripedChildrenStyles = css<ContainerProps>`
    & > *:nth-child(2n) {
        background-color: #f4f4f4;
    }
`

const hoverEffectStyles = css<ContainerProps>`
    :hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`

const spacingStyless = css<ContainerProps>`
    & > *:not(:last-child) {
        margin-right: ${props => (props.vertical ? '0' : '15px')};
        margin-right: ${props => (props.vertical ? '0' : props.childrenSpacedBy || '15px')};
        margin-bottom: ${props => (props.vertical ? props.childrenSpacedBy || '15px' : '0')};
    }
`

const Container = styled.div<ContainerProps>`
    display: flex;
    ${ifProp('spaced', spacingStyless)}
    ${ifProp('childrenSpacedBy', spacingStyless)}
    ${ifProp('padded', 'padding: 15px')};
    ${ifProp('striped', stripedChildrenStyles)}
    ${ifProp('vertical', 'flex-direction: column')};
    ${ifProp('centered', 'align-items: center')};
    ${ifProp('hoverable', hoverEffectStyles)};
`

const as = (tag: keyof JSX.IntrinsicElements) =>
    function ContainerAs(props) {
        return <Container as={tag} {...props} />
    }

export default Object.assign(Container, { as })
