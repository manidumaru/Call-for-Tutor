import React from "react";

const UserContext = React.createContext({
    token: null,
    role: null,
    id: null,
    setInfo: () => {},
});

export default UserContext;