import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import DataDisplay from "../../components/DataDisplay/index.jsx";

const Purchases = () => {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

    const rows = [
        { id: 1, date: "12/34/2003", supplier: "Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 2, date: "12/34/2003", supplier: "Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 3, date: "12/34/2003", supplier: "Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 4, date: "12/34/2003", supplier: "Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 5, date: "12/34/2003", supplier: "Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 6, date: "12/34/2003", supplier: "Granja Verde", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
    ];

    const columns = [
        { field: 'id', headerName: "Número" },
        { field: "date", headerName: "Data", flex: 1 },
        { field: 'supplier', headerName: "Fornecedor", flex: 2 },
        { field: "value", headerName: "Total", flex: 1 },
        { field: "finalValue", headerName: "Valor Líquido", flex: 1 },
        {
            field: "actions",
            headerName: "Ações",
            renderCell: ({ row }) => {
                return (
                    <>
                        <IconButton onClick={() => setDetailsDialogOpen(true)}>
                            <VisibilityIcon />
                        </IconButton>
                    </>
                );
            }
        }
    ];

    return (
        <Navigation>
            <Stack direction="row">
                <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Compras</Typography>
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
                open={detailsDialogOpen}
                fullWidth={true}
                maxWidth="lg"
                onClose={() => setDetailsDialogOpen(false)}
                scroll="paper"
            >
                <DialogTitle>Detalhes da Compra</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <DataDisplay label="Número" value="4532" />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Data" value="12/09/2003" />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Fornecedor" value="Lar" />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Valor Total" value="R$ 134,34" />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Desconto Total" value="R$ 134,34" />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Valor Líquido" value="R$ 134,34" />
                        </Grid>
                        <Grid item xs={12}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ fontWeight: "bold" }}>
                                        <TableCell>Código</TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell>Preço</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>2</TableCell>
                                        <TableCell>Macarrão</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>R$ 32,54</TableCell>
                                        <TableCell>RS$ 98,32</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>5</TableCell>
                                        <TableCell>Fogão</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>R$ 32,54</TableCell>
                                        <TableCell>RS$ 98,32</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>7</TableCell>
                                        <TableCell>Geladeira</TableCell>
                                        <TableCell>3</TableCell>
                                        <TableCell>R$ 32,54</TableCell>
                                        <TableCell>RS$ 98,32</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDetailsDialogOpen(false)}>Fechar</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={createDialogOpen}
                fullWidth={true}
                maxWidth="lg"
                onClose={() => setCreateDialogOpen(false)}
                scroll="paper"
            >
                <DialogTitle>Cadastro de Compra</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>

                        <Grid item xs={6}>
                            <TextField fullWidth label="Data" id="date" />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="supplier">Fornecedor</InputLabel>
                                <Select
                                    labelId="supplier"
                                    id="supplier-select"
                                    label="Fornecedor"
                                >
                                    <MenuItem value={10}>Lar</MenuItem>
                                    <MenuItem value={20}>Granja Verde</MenuItem>
                                    <MenuItem value={30}>Eletrolux</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="payment">Produto</InputLabel>
                                <Select
                                    labelId="payment"
                                    id="payment-select"
                                    label="Forma de Pagamento"
                                >
                                    <MenuItem value={10}>Cartão</MenuItem>
                                    <MenuItem value={20}>Dinheiro</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sx={{ display: "flex" }}>
                            <Button color="success" variant="contained">Adicionar</Button>
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ fontWeight: "bold" }}>
                                        <TableCell>Código</TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell>Preço</TableCell>
                                        <TableCell>Preço Venda</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Remover</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>2</TableCell>
                                        <TableCell>Macarrão</TableCell>
                                        <TableCell>
                                            <TextField label="Quantidade" id="qtd" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Preço" id="price" />
                                        </TableCell>
                                        <TableCell>R$ 23,32</TableCell>
                                        <TableCell>R$ 98,32</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>5</TableCell>
                                        <TableCell>Fogão</TableCell>
                                        <TableCell>
                                            <TextField label="Quantidade" id="qtd" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Preço" id="price" />
                                        </TableCell>
                                        <TableCell>R$ 23,32</TableCell>
                                        <TableCell>R$ 98,32</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>7</TableCell>
                                        <TableCell>Geladeira</TableCell>
                                        <TableCell>
                                            <TextField label="Quantidade" id="qtd" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Preço" id="price" />
                                        </TableCell>
                                        <TableCell>R$ 23,32</TableCell>
                                        <TableCell>R$ 98,32</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Valor Total" value="R$ 134,34" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="Valor Desconto" id="discount" />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Valor Líquido" value="R$ 134,34" />
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
export default Purchases;