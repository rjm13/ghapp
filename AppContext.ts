import React from 'react';

const context = {
    userID: {},
    setUserID: ({}) => {},

    ScorecardID: '' || null,
    setScorecardID: (id: string | null) => {},
}

export const AppContext = React.createContext(context);

