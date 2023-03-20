import {
    Divider,
    IconButton,
    Stack,
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Grid,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import Navigation from "../../layouts/Navigation";
import AddIcon from '@mui/icons-material/Add';
import {DataGrid} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import {Controller, set, useForm} from "react-hook-form";
import {useApi} from "../../services/api.js";
import MessageContext from "../../contexts/messageContext.jsx";

const defaultValues = {
    name: "",
    barCode: "",
    supplierId: "",
    typesId: []
}
const Products = () => {
    const {authApi} = useApi();
    const {showMessage} = useContext(MessageContext);
    const {control, reset, setValue, handleSubmit} = useForm();
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [types, setTypes] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const updateProducts = () => {
        authApi.get("/product")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os produtos", "error");
            })
    }

    useEffect(() => {
        updateProducts();
        authApi.get("/type")
            .then(response => {
                setTypes(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os tipos de produtos", "error");
            });
        authApi.get("/supplier")
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                showMessage("Nao foi possivel carregar os fornecedores", "error");
            });
    }, []);

    const columns = [
        {field: 'id', headerName: 'Código', width: 80},
        {field: 'barCode', headerName: 'Código de barras', flex: 1},
        {field: 'name', headerName: 'Nome', flex: 1},
        {
            field: "types",
            headerName: "Tipos",
            flex: 1,
            renderCell: ({row}) => {
               return row.types.map(type => {
                   return type.name;
               }).join(", ");
            }
        },
        {field: "amount", headerName: "Quantidade", width: 80},
        {
            field: "supplier",
            headerName: "Fornecedor",
            flex: 1,
            renderCell: ({row}) => {
                return (<p>{row.supplier.name}</p>);
            }
        },
        {
            field: "purchasePrice",
            headerName: "Preço Compra",
            flex: 1,
            renderCell: ({row}) => {
                return (row.purchasePrice !== null) ? "R$ " + row.purchasePrice : "Não cadastrado"
            }
        },
        {
            field: "salePrice",
            headerName: "Preço Venda",
            flex: 1,
            renderCell: ({row}) => {
                return (row.salePrice !== null) ? "R$ " + row.salePrice : "Não cadastrado"
            }
        },
        {
            field: "actions",
            headerName: "Ações",
            renderCell: ({row}) => {
                return (
                    <>
                        <IconButton onClick={
                            () => {
                                setSelectedId(row.id);
                                setCreateDialogOpen(true);
                                setValue("name", row.name);
                                setValue("barCode", row.barCode);
                                setValue("supplierId", row.supplier.id);
                                const typesIds = [];
                                row.types.map(type => typesIds.push(type.id));
                                setValue("typesId", typesIds);
                            }
                        }>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => console.log("Show image")}>
                            <ImageIcon/>
                        </IconButton>
                    </>
                );
            }
        }
    ];

    const onSubmit = data => {
        if (selectedId !== null) {
            authApi.put(`/product/${selectedId}`, data)
                .then(response => {
                    updateProducts();
                    setCreateDialogOpen(false);
                    reset(defaultValues);
                    showMessage("Produto atualizado com sucesso", "success");
                })
                .catch(error => {
                    showMessage("Dados inválidos", "error");
                });
        } else {
            authApi.post("/product", data)
                .then(response => {
                    updateProducts();
                    setCreateDialogOpen(false);
                    reset(defaultValues);
                    showMessage("Produto cadastrado com sucesso", "success");
                })
                .catch(error => {
                    showMessage("Dados inválidos", "error");
                });
        }
        setSelectedId(null);
    }


    return (
        <Navigation>
            <Stack direction="row">
                <Typography variant="h4" sx={{display: "inline", mr: 2}}>Produtos</Typography>
                <Button variant="contained" size="small" color="success" startIcon={<AddIcon/>}
                        onClick={() => setCreateDialogOpen(true)}>Cadastrar</Button>
            </Stack>
            <Divider sx={{my: 2}}/>
            <DataGrid
                rows={products}
                columns={columns}
                getRowId={row => row.id}
                autoHeight={true}
            />
            <Dialog
                open={createDialogOpen}
                fullWidth={true}
                maxWidth="lg"
                onClose={() => {
                    setSelectedId(null);
                    setCreateDialogOpen(false);
                    reset(defaultValues);
                }}
                scroll="paper"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{(selectedId !== null) ? "Edição" : "Cadastro"} de Produto</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{mt: 1}}>
                            <Grid item xs={4}>
                                <Controller
                                    defaultValue={""}
                                    name="barCode"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Código de Barras"
                                        />)
                                    }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    defaultValue={""}
                                    name="name"
                                    control={control}
                                    render={({field}) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Nome"
                                        />)
                                    }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="types">Tipos</InputLabel>
                                    <Controller
                                        defaultValue={[]}
                                        name="typesId"
                                        control={control}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                multiple
                                                labelId="types"
                                                id="types-select"
                                                label="Tipos"
                                            >
                                                {types.map(type => (
                                                    <MenuItem key={`type-${type.id}`}
                                                              value={type.id}>
                                                        {type.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="supplier">Fornecedor</InputLabel>
                                    <Controller
                                        defaultValue={[]}
                                        name="supplierId"
                                        control={control}
                                        render={({field}) => (
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
                            <Grid item xs={4} sx={{display: "flex",}}>
                                <Button fullWidth color="success" variant="contained">Adicionar Imagem</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setCreateDialogOpen(false);
                            setSelectedId(null);
                            reset(defaultValues);
                        }}>Cancelar</Button>
                        <Button variant="contained" type="submit">Cadastrar</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </Navigation>
    );
}

export default Products;