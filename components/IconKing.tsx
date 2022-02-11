import React from 'react';
import SvgIconKing from './icon-king.svg';


type Props = {
    color: string
    transform: string | null
}


export default function IconKing(props: Props) {
    return (
        <div 
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '50px'
            }}
            
        >
            <SvgIconKing 
                style={{
                    transformOrigin: 'center 40px',
                    transitionProperty: 'transform',
                    transitionDuration: '2s',
                    transitionTimingFunction: 'cubic-bezier(.29, 1.01, 1, -0.68)',
                    transform: props.transform
                }}
                color={props.color}
            />
        </div>
    )
}