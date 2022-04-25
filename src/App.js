import "./App.css";
import UploadFile from "./components/containers/Upload/UploadFile";
import Message from "./components/containers/AppMessage/Message";
import CreateTask from "./components/containers/Task/CreateTask";
import BitrixProjectsList from "./components/containers/BitrixProjects/BitrixProjectsList";

function App() {
    return (
        <>
            <UploadFile></UploadFile>
            <BitrixProjectsList></BitrixProjectsList>
            <CreateTask></CreateTask>
            <Message></Message>
        </>
    );
}

export default App;
