import { DataGrid } from "@mui/x-data-grid";
import UploadButton from "../Upload/UploadButton";
import CreateTask from "../containers/BitrixTaskCreate/CreateTask";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "TITLE", headerName: "Название операции", width: 1100 },
    { field: "STATUS", headerName: "Статус операции", width: 150 },
    { field: "TIME_ESTIMATE", headerName: "Длительность - по завершении", width: 250 },
    { field: "START_DATE_PLAN", headerName: "Начало", width: 150 },
    { field: "END_DATE_PLAN", headerName: "Окончание", width: 150 },
];


export default function DataTable(props) {
    let excelData = props.props.excelObj.excelDataArray;
    const rows = excelData;

    return (
        <div style={{ height: 900, width: "95%", marginBottom: "10px"}}>
            <CreateTask></CreateTask>

            <UploadButton props={{
                name: "Загрузить файл",
                handlerUploadFile: props.props.excelObj.handlerUploadFile,
            }}></UploadButton>

            <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[]}
                checkboxSelection
                style={{marginBottom:'40px'}}
            />   
        </div>
    );
}
