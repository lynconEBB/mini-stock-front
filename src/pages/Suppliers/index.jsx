import React from "react";
import {Divider, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import {DataGrid} from "@mui/x-data-grid";

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
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={()=> console.log("OlaMundo")}>
                            <VisibilityIcon/>
                        </IconButton>
                    </>
                );
            }
        }
    ];

    return (
        <Navigation>
            <Typography variant="h4">Fornecedores</Typography>
            <Divider sx={{mb:2}}/>
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