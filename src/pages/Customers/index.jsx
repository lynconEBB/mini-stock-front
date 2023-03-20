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
  phone: "",
  document: "",
  address: {
    state: "",
    city: "",
    neighborhood: "",
    number: "",
    street: ""
  }
}


const Customers = () => {

  const { showMessage } = useContext(MessageContext);
  const { authApi } = useApi();
  const { handleSubmit, reset, setValue, control } = useForm({ defaultValues });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);


  const updateCustomers = () => {
    authApi.get("/customer")
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        showMessage("Nao foi possivel carregar os clientes", "error");
      })
  }

  useEffect(updateCustomers, []);

  const columns = [
    { field: 'name', headerName: 'Nome', flex: 1.5 },
    { field: "document", headerName: "Documento", flex: 1 },
    {
      field: "address",
      headerName: "Endereço",
      flex: 1,
      renderCell: ({ row: { address } }) => {
        return `${address.street}, ${address.number}, ${address.neighborhood} - ${address.city}, ${address.state}`
      }
    },
    { field: "phone", headerName: "Telefone", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton onClick={() => {

              authApi.delete(`/customer/${row.id}`)
                .then(response => {
                  showMessage("Cliente excluido com sucesso!");
                  updateCustomers();
                })
                .catch(error => {
                  showMessage("Nao foi excluir este cliente!", "error");
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
      authApi.put(`/customer/${selectedId}`, data)
        .then(response => {
          updateCustomers();
          setCreateDialogOpen(false);
          reset(defaultValues);
          showMessage("Cliente atualizado com sucesso", "success");
        })
        .catch(error => {
          showMessage("Dados inválidos", "error");
        });
    } else {
      authApi.post("/customer", data)
        .then(response => {
          updateCustomers();
          setCreateDialogOpen(false);
          reset(defaultValues);
          showMessage("Cliente cadastrado com sucesso", "success");
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
        <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Clientes</Typography>
        <Button variant="contained" size="small" color="success" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)}>Cadastrar</Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <DataGrid
        rows={customers}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{(selectedId !== null) ? "Edição" : "Cadastro"} de Cliente</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
                <Controller
                  defaultValue={""}
                  name="document"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Documento"
                    />)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  defaultValue={""}
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Telefone"
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
export default Customers;