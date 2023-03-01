import React from "react";
import {Button, Divider, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {DataGrid} from "@mui/x-data-grid";
import { Stack } from "@mui/system";

const Suppliers = () => {
    const rows = [
        { id: 1, name: 'Macarrão Sol', cnpj:"324.543.654/65-5465" },
        { id: 2, name: 'Macarrão Sol', cnpj:"324.543.654/65-5465" },
        { id: 3, name: 'Macarrão Sol', cnpj:"324.543.654/65-5465" },
        { id: 4, name: 'Macarrão Sol', cnpj:"324.543.654/65-5465" },
        { id: 5, name: 'Macarrão Sol', cnpj:"324.543.654/65-5465" },
        { id: 6, name: 'Macarrão Sol', cnpj:"324.543.654/65-5465" }
    ];

    const columns = [
        { field: 'name', headerName: 'Nome', flex:2 },
        { field: "cnpj", headerName: "CNPJ", flex: 1},
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
                <Typography variant="h4" sx={{display:"inline", mr:2}}>Fornecedores</Typography>
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
export default Suppliers;