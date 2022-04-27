import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import UploadButton from "../Upload/UploadButton";
import CreateTask from "../containers/Task/CreateTask";
import BitrixProjectsList from "../containers/BitrixProjects/BitrixProjectsList";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "TITLE", headerName: "Название операции", width: 1100 },
    { field: "STATUS", headerName: "Статус операции", width: 150 },
    { field: "DURATION_PLAN", headerName: "Длительность - по завершении", width: 250 },
    { field: "CREATED_DATE", headerName: "Начало", width: 150 },
    { field: "DEADLINE", headerName: "Окончание", width: 150 },
];


export default function DataTable(props) {
    let excelData = props.props.excelObj.excelDataArray;
    const rows = excelData;

    return (
        <div style={{ height: 900, width: "95%", marginBottom: "10px"}}>
             <Grid style={{ marginTop: 1, marginBottom:'6px' }} container spacing={1}>
                <Grid item={true} style={{width:500, marginRight:5}}>
                    <BitrixProjectsList></BitrixProjectsList>
                </Grid>
                <Grid item={true} style={{marginTop: '9px'}}>
                    <CreateTask></CreateTask>
                </Grid>
            </Grid>
            
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
