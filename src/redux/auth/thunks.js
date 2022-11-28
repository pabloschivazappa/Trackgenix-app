import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginLoading, loginSuccess, loginError } from './actions';
import { auth } from 'helpers/firebase';

export const login = (data) => {
  return async (dispatch) => {
    dispatch(loginLoading());
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);
      const {
        token,
        claims: { role }
      } = await userCredentials.user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      console.log();
      return dispatch(loginSuccess({ token, role }));
    } catch (error) {
      return dispatch(loginError());
    }
  };
};
