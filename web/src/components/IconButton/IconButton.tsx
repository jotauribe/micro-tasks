import styled, { StyledComponentProps } from 'styled-components'

export type IconButtonProps = StyledComponentProps<'button', any, any, any>

const hoveredButtonBackgroundColor = '#f0f0f0'

const IconButton = styled.button`
    box-sizing: border-box;
    min-height: 40px;
    min-width: 40px;
    padding: 8px;
    margin: 3px;
    line-height: 0;
    border: none;
    border-radius: 50%;
    background-color: transparent;

    &:hover {
        background-color: ${props =>
            props.disabled ? 'transparent' : hoveredButtonBackgroundColor};
    }

    &:focus {
        outline: none;
        border: none;
    }
`

export default IconButton
