import React , {useState} from "react";
import { Divider, IconButton, Typography, Button, Dialog, DialogContent, DialogActions,DialogTitle, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Table,TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";

const Suppliers = () => {

    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const rows = [
        { id: 1, name: 'Lar Alimentos', cnpj: "324.543.654/65-5465" },
        { id: 2, name: 'Lar Alimentos', cnpj: "324.543.654/65-5465" },
        { id: 3, name: 'Lar Alimentos', cnpj: "324.543.654/65-5465" },
        { id: 4, name: 'Lar Alimentos', cnpj: "324.543.654/65-5465" },
        { id: 5, name: 'Lar Alimentos', cnpj: "324.543.654/65-5465" },
        { id: 6, name: 'Lar Alimentos', cnpj: "324.543.654/65-5465" },
    ];

    const columns = [
        { field: 'name', headerName: 'Nome', flex: 2 },
        { field: "cnpj", headerName: "CNPJ", flex: 1 },
        {
            field: "actions",
            headerName: "Ações",
            renderCell: ({ row }) => {
                return (
                    <>
                        <IconButton onClick={() => console.log("OlaMundo")}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => setCreateDialogOpen(true)}>
                            <EditIcon />
                        </IconButton>
                    </>
                );
            }
        }
    ];

    return (
        <Navigation>
            <Stack direction="row">
                <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Fornecedores</Typography>
                <Button variant="contained" size="small" color="success" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)}>Cadastrar</Button>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={row => row.id}
                autoHeight={true}
            />
            <Dialog
                open={createDialogOpen}
                fullWidth={true}
                maxWidth="lg"
                onClose={() => setCreateDialogOpen(false)}
                scroll="paper"
            >
                <DialogTitle>Cadastro de Fornecedor</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Nome" id="name" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="CNPJ" id="cnpj" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
                    <Button variant="contained" onClick={() => setCreateDialogOpen(false)}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </Navigation>
    );
}
export default Suppliers;