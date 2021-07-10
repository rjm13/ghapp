import React from 'react';

const context = {
    userID: {} || null,
    setUserID: ({}) => {}
}

export const AppContext = React.createContext(context);