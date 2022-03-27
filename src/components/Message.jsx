import React from 'react';

export const Message = ({children, tipo}) => {
    return (
        <div className={`alerta ${tipo}`}>{children}</div>
    )
}
