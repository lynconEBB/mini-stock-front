import React from "react";
import {Button, Divider, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {DataGrid} from "@mui/x-data-grid";
import { Stack } from "@mui/system";

const Customers = () => {
    const rows = [
        { id: 1, name: 'Macarrão Sol', document:"324.543.654/65-5465", address: "Rua Andradina, 324", phone: "(45) 3424-5434" },
        { id: 2, name: 'Macarrão Sol', document:"324.543.654/65-5465", address: "Rua Andradina, 324", phone: "(45) 3424-5434" },
        { id: 3, name: 'Macarrão Sol', document:"324.543.654/65-5465", address: "Rua Andradina, 324", phone: "(45) 3424-5434" },
        { id: 4, name: 'Macarrão Sol', document:"324.543.654/65-5465", address: "Rua Andradina, 324", phone: "(45) 3424-5434" },
        { id: 5, name: 'Macarrão Sol', document:"324.543.654/65-5465", address: "Rua Andradina, 324", phone: "(45) 3424-5434" },
        { id: 6, name: 'Macarrão Sol', document:"324.543.654/65-5465", address: "Rua Andradina, 324", phone: "(45) 3424-5434" },
        { id: 7, name: 'Macarrão Sol', document:"324.543.654/65-5465", address: "Rua Andradina, 324", phone: "(45) 3424-5434" },
    ];

    const columns = [
        { field: 'name', headerName: 'Nome', flex: 2 },
        { field: "document", headerName: "Documento", flex: 1},
        { field: "address", headerName: "Endereço", flex: 1},
        { field: "phone", headerName: "Telefone", flex: 1},
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
                <Typography variant="h4" sx={{display:"inline", mr:2}}>Clientes</Typography>
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
export default Customers;