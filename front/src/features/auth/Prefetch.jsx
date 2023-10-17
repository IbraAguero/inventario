import { store } from '../../app/store';
import { printersApiSlice } from '../printers/printersApiSlice';
//import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  /* useEffect(() => {
    console.log('subscribing');
    const printers = store.dispatch(
      printersApiSlice.endpoints.getPrinters.initiate()
    );
    //const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log('unsubscribing');
      printers.unsubscribe();
      //users.unsubscribe();
    };
  }, []); */
  useEffect(() => {
    store.dispatch(
      printersApiSlice.util.prefetch('getPrinters', 'printersList', {
        force: true,
      })
    );
    /* store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    ); */
  }, []);

  return <Outlet />;
};
export default Prefetch;
