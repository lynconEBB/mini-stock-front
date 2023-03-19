
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
}

const Types = () => {

  const { showMessage } = useContext(MessageContext);
  const { authApi } = useApi();
  const { handleSubmit, reset, setValue, control, register } = useForm({ defaultValues });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [types, setTypes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);


  const updateTypes = () => {
    authApi.get("/type")
      .then(response => {
        setTypes(response.data);
      })
      .catch(error => {
        showMessage("Nao foi possivel carregar os tipos de produtos", "error");
      })
  }

  useEffect(updateTypes, []);

  const columns = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton onClick={() => {
              authApi.delete(`/type/${row.id}`)
                .then(response => {
                  showMessage("Tipos excluido com sucesso!");
                  updateTypes();
                })
                .catch(error => {
                  showMessage("Nao foi excluir este tipo!", "error");
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
      authApi.put(`/type/${selectedId}`, data)
        .then(response => {
          updateTypes();
          setCreateDialogOpen(false);
          reset(defaultValues);
          showMessage("Tipo atualizado com sucesso", "success");
        })
        .catch(error => {
          showMessage("Dados inválidos", "error");
        });
    } else {
      authApi.post("/type", data)
        .then(response => {
          updateTypes();
          setCreateDialogOpen(false);
          reset(defaultValues);
          showMessage("Tipo cadastrado com sucesso", "success");
        })
        .catch(error => {
          showMessage("Dados inválidos", "error");
        });
    }
  }

  return (
    <Navigation>

      <Stack direction="row">
        <Typography variant="h4" sx={{ display: "inline", mr: 2 }}>Tipos de Produtos</Typography>
        <Button variant="contained" size="small" color="success" startIcon={<AddIcon />} onClick={() => setCreateDialogOpen(true)}>Cadastrar</Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <DataGrid
        rows={types}
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
          <DialogTitle>Cadastro de Tipos</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Controller
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
export default Types;