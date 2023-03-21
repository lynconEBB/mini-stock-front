import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import DataDisplay from "../../components/DataDisplay/index.jsx";
import { useApi } from "../../services/api.js";
import MessageContext from "../../contexts/messageContext.jsx";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";

const defaultValues = {
    date: "",
    discount: 0,
    supplierId: "",
    items: []
}

const calculateItemTotal = (itemValue) => {
    if (itemValue === undefined || Number.isNaN(itemValue.amount) || Number.isNaN(itemValue.price))
        return "R$ 0.00";

    return Number((itemValue.amount * itemValue.price));
}

const calculateSalePrice = (itemValue) => {
    if (itemValue === undefined || itemValue.price === "" || Number.isNaN(itemValue.price))
        return "R$ 0.00";

    return Number((parseFloat(itemValue.price) + (parseFloat(itemValue.price) * 0.15)));
}

const calculateTotal = (items) => {
    let total = parseFloat(0.0);

    for (const item of items) {
        total += calculateItemTotal(item);
    }
    return Number(parseFloat(total));
}

const calculateLiquidTotal = (items, discount) => {
    const total = calculateTotal(items);

    if (discount === undefined || discount === "" || Number.isNaN(discount))
        return total;

    const discountValue = total * parseFloat(discount) / 100.00;
    return Number((total - discountValue));
}

const Purchases = () => {
    const { authApi } = useApi();
    const { showMessage } = useContext(MessageContext);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const { control, reset, handleSubmit } = useForm({
        defaultValues: {
            items: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: "items",
        control
    });

    const itemsValues = useWatch({
        name: "items",
        control
    });

    const discountValue = useWatch({
        name: "discount",
        control
    })

    const updatePurchases = () => {
        authApi.get("/purchase")
            .then(response => {
                setPurchases(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar as compras!", "error");
            });
    }

    const updateProducts = () => {
        authApi.get("/product")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os produtos", "error");
            });
    }

    useEffect(() => {
        authApi.get("/supplier")
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os fornecedores", "error");
            });
        updateProducts();
        updatePurchases();
    }, []);

    const columns = [
        { field: 'id', headerName: "Número" },
        { field: "date", headerName: "Data", flex: 1 },
        {
            field: 'supplier',
            headerName: "Fornecedor",
            flex: 2,
            renderCell: ({ row }) => {
                return <p>{row.supplier.name}</p>
            }
        },
        {
            field: "total",
            headerName: "Total",
            flex: 1,
            renderCell: ({ row }) => {
                return <p>R$ {Number(row.total).toFixed(2)}</p>
            }
        },
        {
            field: "liquidPrice",
            headerName: "Valor Líquido",
            flex: 1,
            renderCell: ({ row }) => {
                return <p>R$ {Number(row.liquidPrice).toFixed(2)}</p>
            }
        },
        {
            field: "actions",
            headerName: "Ações",
            renderCell: ({ row }) => {
                return (
                    <>
                        <IconButton
                            onClick={() => {
                                setSelectedPurchase(row);
                                setDetailsDialogOpen(true);
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    </>
                );
            }
        }
    ];

    const onSubmit = data => {
        for (const item of data.items) {
            item.productId = item.product.id;
        }
        authApi.post("/purchase", data)
            .then(response => {
                updatePurchases();
                setCreateDialogOpen(false);
                reset(defaultValues);
                showMessage("Compra cadastrado com sucesso", "success");
            })
            .catch(error => {
                showMessage("Dados inválidos", "error");
            });
    };

    return (
        <Navigation>
            <Stack direction="row">
                <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Compras</Typography>
                <Button variant="contained" size="small" color="success" startIcon={<AddIcon />}
                    onClick={() => setCreateDialogOpen(true)}>Cadastrar</Button>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <DataGrid
                rows={purchases}
                columns={columns}
                getRowId={row => row.id}
                autoHeight={true}
            />
            <Dialog
                open={detailsDialogOpen}
                fullWidth={true}
                maxWidth="lg"
                onClose={() => {
                    setSelectedPurchase(null);
                    setDetailsDialogOpen(false);
                }}
                scroll="paper"
            >
                <DialogTitle>Detalhes da Compra</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <DataDisplay label="Número" value={selectedPurchase?.id} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Data" value={selectedPurchase?.date} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Fornecedor" value={selectedPurchase?.supplier.name} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Valor Total" value={`R$ ${Number(selectedPurchase?.total).toFixed(2)}`} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Desconto Total" value={`${selectedPurchase?.discount} %`} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Valor Líquido" value={`R$ ${Number(selectedPurchase?.liquidPrice).toFixed(2)}`} />
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
                                    {selectedPurchase?.items.map((item) => (
                                        <TableRow key={item.idProductId}>
                                            <TableCell>{item.idProductId}</TableCell>
                                            <TableCell>{item.idProductName}</TableCell>
                                            <TableCell>{item.amount}</TableCell>
                                            <TableCell>{`R$ ${Number(item.price).toFixed(2)}`}</TableCell>
                                            <TableCell>{`R$ ${Number(item.total).toFixed(2)}`}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setSelectedPurchase(null);
                        setDetailsDialogOpen(false);
                    }}
                    >
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={createDialogOpen}
                fullWidth={true}
                maxWidth="lg"
                onClose={() => {
                    updateProducts();
                    reset(defaultValues);
                    setCreateDialogOpen(false);
                }}
                scroll="paper"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Cadastro de Compra</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={6}>
                                <Controller
                                    defaultValue={""}
                                    name="date"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Data"
                                        />)
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="supplier">Fornecedor</InputLabel>
                                    <Controller
                                        defaultValue={null}
                                        name="supplierId"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="supplierId"
                                                id="supplier-select"
                                                label="Fornecedor"
                                            >
                                                {suppliers.map(supplier => (
                                                    <MenuItem key={`type-${supplier.id}`}
                                                        value={supplier.id}>
                                                        {supplier.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="product">Produto</InputLabel>
                                    <Select
                                        labelId="payment"
                                        id="product-select"
                                        label="Produto"
                                        value={selectedProduct}
                                        onChange={e => setSelectedProduct(e.target.value)}
                                        defaultValue={{}}
                                    >
                                        {products.map(product => (
                                            <MenuItem key={`type-${product.id}`}
                                                value={product}>
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sx={{ display: "flex" }}>
                                <Button
                                    color="success"
                                    variant="contained"
                                    onClick={() => {
                                        if (selectedProduct !== null) {
                                            setProducts(old => {
                                                return old.filter((item) => item !== selectedProduct);
                                            });
                                            append({
                                                amount: 0,
                                                price: 0.00,
                                                product: selectedProduct
                                            });

                                            setSelectedProduct(null);
                                        }
                                    }}
                                >
                                    Adicionar
                                </Button>
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
                                        {fields.map((field, index) => {
                                            return (
                                                <TableRow key={field.id}>
                                                    <TableCell>{field.product.id}</TableCell>
                                                    <TableCell>{field.product.name}</TableCell>
                                                    <TableCell>
                                                        <Controller
                                                            defaultValue={""}
                                                            name={`items.${index}.amount`}
                                                            control={control}
                                                            render={({ field: controlField }) => (
                                                                <TextField
                                                                    {...controlField}
                                                                    fullWidth
                                                                    type="number"
                                                                    label="Quantidade"
                                                                />)
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Controller
                                                            defaultValue={""}
                                                            name={`items.${index}.price`}
                                                            control={control}
                                                            render={({ field: controlField }) => (
                                                                <TextField
                                                                    type="number"
                                                                    {...controlField}
                                                                    fullWidth
                                                                    label="Preço"
                                                                />)
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>{`R$ ${Number(calculateSalePrice(itemsValues[index])).toFixed(2)}`}</TableCell>
                                                    <TableCell>{`R$ ${Number(calculateItemTotal(itemsValues[index])).toFixed(2)}`}</TableCell>
                                                    <TableCell>
                                                        <IconButton onClick={() => {
                                                            setProducts(old => {
                                                                old.push(field.product);
                                                                return old;
                                                            })
                                                            remove(index)
                                                        }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid item xs={4}>
                                <DataDisplay label="Valor Total" value={`R$ ${Number(calculateTotal(itemsValues)).toFixed(2)}`} />
                            </Grid>
                            <Grid item xs={4}>
                                <Grid item xs={6}>
                                    <Controller
                                        defaultValue={""}
                                        name="discount"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                type="number"
                                                label="Desconto(%)"
                                            />)
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <DataDisplay label="Valor Líquido" value={`R$ ${Number(calculateLiquidTotal(itemsValues, discountValue)).toFixed(2)}`} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            updateProducts();
                            reset(defaultValues);
                            setCreateDialogOpen(false);
                        }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" type="submit">Cadastrar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Navigation>
    );
}
export default Purchases;