import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './AppContext';

export const AppContextProvider = (props) => {


  const [loading, setLoading] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        loading, setLoading,
        projectDialogOpen, setProjectDialogOpen
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  appContext: PropTypes.object,
  children: PropTypes.node,
};

export default AppContextProvider;
