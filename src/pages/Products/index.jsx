import { Divider, IconButton, Typography} from "@mui/material";
import React from "react";
import Navigation from "../../layouts/Navigation";
import {DataGrid} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Products = () => {
    const rows = [
        { id: 1, name: 'Macarrão Sol', types: ["Ola", "Teste"], supplier: "PTI", amount: 3  },
        { id: 2, name: 'Macarrão Sol', types: ["Ola", "Teste"], supplier: "PTI", amount: 3  },
        { id: 3, name: 'Macarrão Sol', types: ["Ola", "Teste"], supplier: "PTI", amount: 3  },
        { id: 4, name: 'Macarrão Sol', types: ["Ola", "Teste"], supplier: "PTI", amount: 3  },
        { id: 5, name: 'Macarrão Sol', types: ["Ola", "Teste"], supplier: "PTI", amount: 3  },
        { id: 6, name: 'Macarrão Sol', types: ["Ola", "Teste"], supplier: "PTI", amount: 3  },
        { id: 7, name: 'Macarrão Sol', types: ["Ola", "Teste"], supplier: "PTI", amount: 3  },
    ];

    const columns = [
        { field: 'id', headerName: 'Código', width: 150 },
        { field: 'name', headerName: 'Nome', flex:1 },
        { field: "types", headerName: "Tipos", width: 300},
        { field: "amount", headerName: "Quantidade", width: 150},
        { field: "supplier", headerName: "Fornecedor", flex:1 },
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
            <Typography variant="h4">Produtos</Typography>
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

export default Products;