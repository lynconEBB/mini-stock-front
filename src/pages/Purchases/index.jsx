import React from "react";
import {Button, Divider, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {DataGrid} from "@mui/x-data-grid";
import { Stack } from "@mui/system";

const Purchases = () => {
    const rows = [
        { id: 1, date: "12/34/2003", supplier:"Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 2, date: "12/34/2003", supplier:"Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 3, date: "12/34/2003", supplier:"Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 4, date: "12/34/2003", supplier:"Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 5, date: "12/34/2003", supplier:"Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 6, date: "12/34/2003", supplier:"Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
    ];

    const columns = [
        { field: 'id', headerName: "Número" },
        { field: "date", headerName: "Data", flex: 1},
        { field: 'supplier', headerName: "Fornecedor", flex:2},
        { field: "value", headerName: "Total", flex: 1},
        { field: "finalValue", headerName: "Valor Líquido", flex: 1},
        {
            field: "actions",
            headerName: "Ações",
            renderCell: ({row}) => {
                return (
                    <>
                        <IconButton onClick={()=> console.log("OlaMundo")}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton onClick={()=> console.log("OlaMundo")}>
                            <EditIcon/>
                        </IconButton>
                    </>
                );
            }
        }
    ];

    return (
        <Navigation>
            <Stack direction="row">
                <Typography variant="h4" sx={{display:"inline", mr:2}}>Compras</Typography>
                <Button variant="contained" size="small" color="success" startIcon={<AddIcon/>}>Cadastrar</Button>
            </Stack>
            <Divider sx={{my:2}}/>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={row => row.id}
                autoHeight={true}
            />
        </Navigation>
    );
}
export default Purchases;