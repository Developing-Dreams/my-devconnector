import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './type';

 const setAlert = (msg, alertType) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
};
export default setAlert;

