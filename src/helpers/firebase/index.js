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

const selectUrl = (role) => {
  if (role === 'EMPLOYEE') return 'employees';
  if (role === 'ADMIN') return 'admins';
  if (role === 'SUPER_ADMIN') return 'super-admins';
  return null;
};

export const tokenListener = () => {
  onIdTokenChanged(auth, async (user) => {
    if (user) {
      try {
        const {
          token,
          claims: { role, email, user_id }
        } = await user.getIdTokenResult();
        if (token) {
          store.dispatch(setLoggedIn(role, email));
          sessionStorage.setItem('token', token);
        }
        await fetch(`${process.env.REACT_APP_API_URL}/${selectUrl(role)}/fuid/${user_id}`, {
          headers: { token }
        })
          .then((res) => res.json())
          .then((response) => {
            store.dispatch(setIdValue(response.data[0]._id));
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      store.dispatch(setLoggedOut());
    }
  });
};
