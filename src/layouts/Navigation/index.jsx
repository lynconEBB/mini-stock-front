import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    IconButton
} from "@mui/material";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Box } from "@mui/system";
import React from "react";
import {useNavigate} from "react-router-dom";

const Navigation = ({children}) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h6" noWrap component="div">
                        Mini Stock
                    </Typography>
                    <IconButton sx={{color:"white"}} onClick={() => navigate("/")}>
                        <ExitToAppIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem key={1} disablePadding>
                            <ListItemButton onClick={() => navigate("/products")}>
                                <ListItemIcon>
                                    <ShoppingCartIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Produtos"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={2} disablePadding>
                            <ListItemButton onClick={() => navigate("/sales")}>
                                <ListItemIcon>
                                    <PointOfSaleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Vendas"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={3} disablePadding>
                            <ListItemButton onClick={() => navigate("/purchases")}>
                                <ListItemIcon>
                                    <ShoppingBasketIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Compras"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={4} disablePadding>
                            <ListItemButton onClick={() => navigate("/customers")}>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Clientes"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={5} disablePadding>
                            <ListItemButton onClick={() => navigate("/suppliers")}>
                                <ListItemIcon>
                                    <ApartmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Fornecedores"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}

export default Navigation;