import { initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { setLoggedIn, setLoggedOut, setIdValue } from 'redux/auth/actions';
import store from 'redux/store';

const fireBaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

export const firebaseApp = initializeApp(fireBaseConfig);

export const auth = getAuth(firebaseApp);

export const tokenListener = () => {
  onIdTokenChanged(auth, async (user) => {
    console.log('onIdTokenChanged');
    if (user) {
      try {
        const {
          token,
          claims: { role, email, user_id }
        } = await user.getIdTokenResult();
        console.log('onIdTokenChanged tokenResult:', { token, role, email: email, user_id });
        if (token) {
          store.dispatch(setLoggedIn(role, email, user_id));
          await fetch(`${process.env.REACT_APP_API_URL}/employees/fuid/${user_id}`, {
            headers: { token }
          })
            .then((res) => res.json())
            .then((response) => {
              console.log(response.data);
              console.log(response.data[0]._id);
              store.dispatch(setIdValue(response.data[0]._id));
            });
        }
        sessionStorage.setItem('token', token);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      console.log('no user');
      store.dispatch(setLoggedOut());
    }
  });
};
