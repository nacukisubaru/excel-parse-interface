import { useDispatch, useSelector } from "react-redux";
import { setMessage, showSnack, togglePreloader } from "../redux/actions/appActions";


export const useShowMessage = () => {
    const appManager = useSelector((state) => state.appManager);
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

export const useTogglePreloader = () => {
    const dispatch = useDispatch();
    const appManager = useSelector((state) => state.appManager);

    const toggle = (isShow) => {
        dispatch(togglePreloader(isShow));
    }

    return {
       isShow: appManager.preloader,
       toggle
    }

}
