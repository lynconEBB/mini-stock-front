import React, {useContext, useEffect, useState} from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {DataGrid} from "@mui/x-data-grid";
import {Stack} from "@mui/system";
import DataDisplay from "../../components/DataDisplay/index.jsx";
import {useApi} from "../../services/api.js";
import MessageContext from "../../contexts/messageContext.jsx";
import {Controller, useFieldArray, useForm, useWatch} from "react-hook-form";

const defaultValues = {
    date: "",
    discount: 0,
    supplierId: "",
    items: []
}

const calculateItemTotal = (itemValue) => {
    if (itemValue === undefined || Number.isNaN(itemValue.amount) || Number.isNaN(itemValue.price))
        return "R$ 0.00";

    return Number((itemValue.amount * itemValue.product.salePrice).toFixed(2));
}

const calculateTotal = (items) => {
    let total = parseFloat(0.0);

    for (const item of items) {
        total += calculateItemTotal(item);
    }
    return Number(parseFloat(total).toFixed(2));
}

const calculateLiquidTotal = (items, discount) => {
    const total = calculateTotal(items);

    if (discount === undefined || discount === "" || Number.isNaN(discount))
        return total;

    const discountValue = total * parseFloat(discount) / 100.00;
    return Number((total - discountValue).toFixed(2));
}

const Purchases = () => {
    const { authApi } = useApi();
    const { showMessage } = useContext(MessageContext);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSale, setSelectedSale] = useState(null);

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

    const updateSales = () => {
        authApi.get("/sale")
            .then(response => {
                setSales(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar as compras!", "error");
            });
    }

    const updateProducts = () => {
        authApi.get("/product", {params: { withStock: true}})
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os produtos", "error");
            });
    }

    useEffect(() => {
        authApi.get("/customer")
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os clientes", "error");
            });
        updateProducts();
        updateSales();
    }, []);

    const columns = [
        { field: 'id', headerName: "Número" },
        { field: "date", headerName: "Data", flex: 1 },
        {
            field: 'customer',
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
            field: "paymentMethod",
            headerName: "Forma de Pagamento",
            flex: 1,
            renderCell: ({ row }) => {
                return <p>{(row.paymentMethod === "CREDIT_CARD") ? "Cartão de Creédito" : "Dinheiro" }</p>
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
                                setSelectedSale(row);
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
        authApi.post("/sale", data)
            .then(response => {
                updateSales();
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
                <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Vendas</Typography>
                <Button variant="contained" size="small" color="success" startIcon={<AddIcon />}
                    onClick={() => setCreateDialogOpen(true)}>Cadastrar</Button>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <DataGrid
                rows={sales}
                columns={columns}
                getRowId={row => row.id}
                autoHeight={true}
            />
            <Dialog
                open={detailsDialogOpen}
                fullWidth={true}
                maxWidth="lg"
                onClose={() => {
                    setSelectedSale(null);
                    setDetailsDialogOpen(false);
                }}
                scroll="paper"
            >
                <DialogTitle>Detalhes da Compra</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <DataDisplay label="Número" value={selectedSale?.id} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Data" value={selectedSale?.date} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Fornecedor" value={selectedSale?.supplier.name} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Valor Total" value={`R$ ${Number(selectedSale?.total).toFixed(2)}`} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Desconto Total" value={`${selectedSale?.discount} %`} />
                        </Grid>
                        <Grid item xs={4}>
                            <DataDisplay label="Valor Líquido" value={`R$ ${Number(selectedSale?.liquidPrice).toFixed(2)}`} />
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
                                    {selectedSale?.items.map((item) => (
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
                        setSelectedSale(null);
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
                    <DialogTitle>Cadastro de Venda</DialogTitle>
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
                                    <InputLabel id="supplier">Cliente</InputLabel>
                                    <Controller
                                        defaultValue={null}
                                        name="customerId"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="customerId"
                                                id="customer-select"
                                                label="Cliente"
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
                                    <InputLabel id="payment">Forma de Pagamento</InputLabel>
                                    <Controller
                                        defaultValue={null}
                                        name="paymentMethod"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="payment"
                                                id="payment-select"
                                                label="Forma de Pagamento"
                                            >
                                                <MenuItem value="CREDIT_CARD">
                                                    Cartão de Crédito
                                                </MenuItem>
                                                <MenuItem value="MONEY">
                                                    Dinheiro
                                                </MenuItem>
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
                            <Grid item xs={4} sx={{ display: "flex" }}>
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
                                            <TableCell>Estoque</TableCell>
                                            <TableCell>Quantidade</TableCell>
                                            <TableCell>Preço</TableCell>
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
                                                    <TableCell>{field.product.amount}</TableCell>
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
                                                    <TableCell>{`R$ ${Number(field.product.salePrice).toFixed(2)}`}</TableCell>
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
                                <DataDisplay label="Valor Total" value={`R$ ${calculateTotal(itemsValues)}`} />
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
                                <DataDisplay label="Valor Líquido" value={`R$ ${calculateLiquidTotal(itemsValues, discountValue)}`} />
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