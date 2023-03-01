import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import DataDisplay from "../../components/DataDisplay/index.jsx";


const Sales = () => {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

    const rows = [
        { id: 1, paymentMethod: 'Cartão', date: "12/34/2003", customer: "Lyncon Baez", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 2, paymentMethod: 'Cartão', date: "12/34/2003", customer: "Lyncon Baez", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 3, paymentMethod: 'Cartão', date: "12/34/2003", customer: "Lyncon Baez", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 4, paymentMethod: 'Cartão', date: "12/34/2003", customer: "Lyncon Baez", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 5, paymentMethod: 'Cartão', date: "12/34/2003", customer: "Lyncon Baez", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 6, paymentMethod: 'Cartão', date: "12/34/2003", customer: "Lyncon Baez", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 7, paymentMethod: 'Cartão', date: "12/34/2003", customer: "Lyncon Baez", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
        { id: 8, paymentMethod: 'Cartão', date: "12/34/2003", customer: "Lyncon Baez", value: "R$ 12,43", discount: "R$ 2,34", finalValue: "R$ 10,02" },
    ];

    const columns = [
        { field: 'id', headerName: "Número" },
        { field: "date", headerName: "Data", flex: 1 },
        { field: 'paymentMethod', headerName: "Forma de Pagamento", flex: 1 },
        { field: 'customer', headerName: "Cliente", flex: 2 },
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
                <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Vendas</Typography>
                <Button variant="contained" size="small" color="success" startIcon={<AddIcon />}>Cadastrar</Button>
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
                <DialogTitle>Detalhes da Venda</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <DataDisplay label="Número" value="4532" />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Data" value="12/09/2003" />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Cliente" value="Amin Ismail" />
                        </Grid>
                        <Grid item xs={3}>
                            <DataDisplay label="Valor Total" value="R$ 134,34" />
                        </Grid>
                        <Grid item xs={3}>
                            <DataDisplay label="Desconto Total" value="R$ 134,34" />
                        </Grid>
                        <Grid item xs={3}>
                            <DataDisplay label="Valor Líquido" value="R$ 134,34" />
                        </Grid>
                        <Grid item xs={3}>
                            <DataDisplay label="Forma de Pagamento" value="Dinheiro" />
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
        </Navigation>
    );
}
export default Sales;