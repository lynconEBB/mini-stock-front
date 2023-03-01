import { Divider, IconButton, Stack, Typography, Button, Dialog, DialogContent, DialogActions,DialogTitle, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Table,TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import React , {useState} from "react";
import Navigation from "../../layouts/Navigation";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';

const Products = () => {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const rows = [
        { id: 1, name: 'Macarrão Sol', types: ["Alimento", "cozinha"], supplier: "Lar", amount: 3, costPrice: "R$ 32,44", salePrice: "R$ 45,34", barCode: "454353" },
        { id: 2, name: 'Macarrão Sol', types: ["Alimento", "cozinha"], supplier: "Lar", amount: 3, costPrice: "R$ 32,44", salePrice: "R$ 45,34", barCode: "454353" },
        { id: 3, name: 'Macarrão Sol', types: ["Alimento", "cozinha"], supplier: "Lar", amount: 3, costPrice: "R$ 32,44", salePrice: "R$ 45,34", barCode: "454353" },
        { id: 4, name: 'Macarrão Sol', types: ["Alimento", "cozinha"], supplier: "Lar", amount: 3, costPrice: "R$ 32,44", salePrice: "R$ 45,34", barCode: "454353" },
        { id: 5, name: 'Macarrão Sol', types: ["Alimento", "cozinha"], supplier: "Lar", amount: 3, costPrice: "R$ 32,44", salePrice: "R$ 45,34", barCode: "454353" },
        { id: 6, name: 'Macarrão Sol', types: ["Alimento", "cozinha"], supplier: "Lar", amount: 3, costPrice: "R$ 32,44", salePrice: "R$ 45,34", barCode: "454353" },
        { id: 7, name: 'Macarrão Sol', types: ["Alimento", "cozinha"], supplier: "Lar", amount: 3, costPrice: "R$ 32,44", salePrice: "R$ 45,34", barCode: "454353" },
    ];

    const columns = [
        { field: 'id', headerName: 'Código', width: 80 },
        { field: 'barCode', headerName: 'Código de barras', flex:1 },
        { field: 'name', headerName: 'Nome', flex: 1 },
        { field: "types", headerName: "Tipos", flex:1 },
        { field: "amount", headerName: "Quantidade", width: 80 },
        { field: "supplier", headerName: "Fornecedor", flex: 1 },
        { field: "costPrice", headerName: "Preço Compra", flex: 1 },
        { field: "salePrice", headerName: "Preço Venda", flex: 1 },
        {
            field: "actions",
            headerName: "Ações",
            renderCell: ({ row }) => {
                return (
                    <>
                        <IconButton onClick={() => setCreateDialogOpen(true)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => console.log("Show image")}>
                            <ImageIcon />
                        </IconButton>
                    </>
                );
            }
        }
    ];

    return (
        <Navigation>
            <Stack direction="row">
                <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Produtos</Typography>
                <Button variant="contained" size="small" color="success" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)} >Cadastrar</Button>
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
                <DialogTitle>Cadastro de Produto</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>

                        <Grid item xs={4}>
                            <TextField fullWidth label="Codigo de Barras" id="barCode" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Nome" id="name" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="types">Tipos</InputLabel>
                                <Select
                                    labelId="types"
                                    id="types-select"
                                    label="Tipos"
                                >
                                    <MenuItem value={10}>Eletrodomestico</MenuItem>
                                    <MenuItem value={20}>Alimento</MenuItem>
                                    <MenuItem value={20}>Casa</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="supplier">Fornecedor</InputLabel>
                                <Select
                                    labelId="supplier"
                                    id="supplier-select"
                                    label="Fornecedor"
                                >
                                    <MenuItem value={10}>Cartão</MenuItem>
                                    <MenuItem value={20}>Dinheiro</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} sx={{display:"flex", }}>
                            <Button fullWidth color="success" variant="contained">Adicionar Imagem</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCreateDialogOpen(false)}>Cancelar</Button>
                    <Button variant="contained" onClick={() => setCreateDialogOpen(false)}>Cadastrar</Button>
                </DialogActions>
            </Dialog>

        </Navigation>
    );
}

export default Products;