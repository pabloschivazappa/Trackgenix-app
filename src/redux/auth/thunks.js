import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { loginLoading, loginError, logoutLoading, logoutError } from './actions';
import { auth } from 'helpers/firebase';

export const login = (data) => {
  return async (dispatch) => {
    dispatch(loginLoading());
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);
      const {
        claims: { role, user_id }
      } = await userCredentials.user.getIdTokenResult();
      console.log(user_id);
      return role;
    } catch (error) {
      return dispatch(loginError());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutLoading());
    try {
      await signOut(auth);
      sessionStorage.clear();
    } catch (error) {
      return dispatch(logoutError(error.toString()));
    }
  };
};
