import React, { useContext, useEffect, useState } from "react";
import { Divider, IconButton, Typography, Button, Dialog, DialogContent, DialogActions, DialogTitle, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit.js";
import Navigation from "../../layouts/Navigation/index.jsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import { useApi } from "../../services/api.js";
import MessageContext from "../../contexts/messageContext.jsx";

const defaultValues = {
  name: "",
  cnpj: "",
  address: {
    state: "",
    city: "",
    neighborhood: "",
    number: "",
    street: "",
  }
}


const Suppliers = () => {

  const { showMessage } = useContext(MessageContext);
  const { authApi } = useApi();
  const { handleSubmit, reset, setValue, control } = useForm({ defaultValues });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);


  const updateSuppliers = () => {
    authApi.get("/supplier")
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        showMessage("Nao foi possivel carregar os fornecedores", "error");
      })
  }

  useEffect(updateSuppliers, []);

  const columns = [
    { field: 'name', headerName: 'Nome', flex: 1.5 },
    { field: "cnpj", headerName: "CNPJ", flex: 1 },
    {
      field: "address",
      headerName: "Endereço",
      flex: 1,
      renderCell: ({ row: { address } }) => {
        return `${address.street}, ${address.number}, ${address.neighborhood} - ${address.city}, ${address.state}`
      }
    },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton onClick={() => {

              authApi.delete(`/supplier/${row.id}`)
                .then(response => {
                  showMessage("Fornecedor excluido com sucesso!");
                  updateSuppliers();
                })
                .catch(error => {
                  showMessage("Nao foi excluir este fornecedor!", "error");
                })
            }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => {
              setSelectedId(row.id);
              setCreateDialogOpen(true);
              for (let key in row) {
                setValue(key, row[key]);
              }
            }}>
              <EditIcon />
            </IconButton>
          </>
        );
      }
    }
  ];

  const onSubmit = data => {
    if (selectedId !== null) {
      authApi.put(`/supplier/${selectedId}`, data)
        .then(response => {
          updateSuppliers();
          setCreateDialogOpen(false);
          reset(defaultValues);
          showMessage("Fornecedor atualizado com sucesso", "success");
        })
        .catch(error => {
          showMessage("Dados inválidos", "error");
        });
    } else {
      authApi.post("/supplier", data)
        .then(response => {
          updateSuppliers();
          setCreateDialogOpen(false);
          reset(defaultValues);
          showMessage("Fornecedor cadastrado com sucesso", "success");
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
        <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Fornecedores</Typography>
        <Button variant="contained" size="small" color="success" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)}>Cadastrar</Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <DataGrid
        rows={suppliers}
        columns={columns}
        getRowId={row => row.id}
        autoHeight={true}
      />

      <Dialog
        open={createDialogOpen}
        fullWidth={true}
        maxWidth="lg"
        onClose={() => {
            reset(defaultValues);
            setCreateDialogOpen(false);
        }}
        scroll="paper"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{(selectedId !== null) ? "Edição" : "Cadastro"} de Fornecedor</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Controller
                  defaultValue={""}
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nome"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  defaultValue={""}
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="CNPJ"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Endereço</Typography>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  defaultValue={""}
                  name="address.street"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Rua"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  defaultValue={""}
                  name="address.number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Número"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  defaultValue={""}
                  name="address.neighborhood"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Bairro"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  defaultValue={""}
                  name="address.city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Cidade"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  defaultValue={""}
                  name="address.state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Estado"
                    />)
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setSelectedId(null);
                setCreateDialogOpen(false);
                reset(defaultValues);
              }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit">
              Confirmar
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </Navigation>
  );
}
export default Suppliers;