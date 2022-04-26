import { useDispatch, useSelector } from "react-redux";
import { setMessage, showSnack } from "../redux/actions/appActions";


export const useShowMessage = () => {
    let appManager = useSelector((state) => state.appManager);
    const dispatch = useDispatch();

    const show = (message, status) => {
        dispatch(setMessage({name: message, status}));
        dispatch(showSnack(true));
    };

    const close = () => {
        dispatch(showSnack(false));
    }

    return {
        appManager,
        show,
        close
    };
};
