import "./App.css";
import UploadFile from "./components/containers/Upload/UploadFile";
import Message from "./components/containers/AppMessage/Message";
import CustomAppBar from "./components/CustomAppBar/CustomAppBar";
import PreloaderBackDrop from "./components/Preloader/PreloaderBackDrop";

function App() {
    return (
        <>
            <CustomAppBar props={{name:'Примавера сервис задач'}}></CustomAppBar>
            <UploadFile></UploadFile>
            <Message></Message>
            <PreloaderBackDrop></PreloaderBackDrop>
        </>
    );
}

export default App;
