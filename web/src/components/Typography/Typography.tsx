import React from 'react'

import classnames from '@utils/classnames'
import './Typography.scss'

export type TypographyProps = React.HTMLAttributes<HTMLOrSVGElement> & {
    bold?: boolean
    small?: boolean
    large?: boolean
    className?: string
    as?: keyof JSX.IntrinsicElements
    href?: string
}

const clx = classnames('typography')

const Typography: React.FC<TypographyProps> = ({
    bold,
    small,
    large,
    as: Component = 'div',
    className,
    ...otherProps
}) => {
    const classes = clx({ bold, small, large })
    return (
        <Component
            {...otherProps}
            data-testid="Typography"
            className={`${classes} ${className || ''}`}
        />
    )
}

export default Typography
