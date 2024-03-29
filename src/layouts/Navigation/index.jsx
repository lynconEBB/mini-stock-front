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
import { useAuth } from "../../hooks/useAuth";

const Navigation = ({children}) => {

    const navigate = useNavigate();

    const {signout, getUser} = useAuth();
    console.log(getUser().role === "ADMIN");;

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={true} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h6" noWrap component="div">
                        Mini Stock
                    </Typography>
                    <Box sx={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                        <Typography variant="h6" noWrap component="div" sx={{fontWeight:"bold"}}>
                           {getUser().sub} 
                        </Typography>
                        <IconButton sx={{color:"white"}} onClick={() => {signout(); navigate("/login");}}>
                            <ExitToAppIcon/>
                        </IconButton>
                    </Box>
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
                       {getUser().role === "STOCK_MANAGER" && <ListItem key={1} disablePadding>
                            <ListItemButton onClick={() => navigate("/products")}>
                                <ListItemIcon>
                                    <ShoppingCartIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Produtos"} />
                            </ListItemButton>
                        </ListItem> }
                        {getUser().role === "SELLER" && <ListItem key={2} disablePadding>
                            <ListItemButton onClick={() => navigate("/sales")}>
                                <ListItemIcon>
                                    <PointOfSaleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Vendas"} />
                            </ListItemButton>
                        </ListItem> }
                        {getUser().role === "STOCK_MANAGER" && <ListItem key={3} disablePadding>
                            <ListItemButton onClick={() => navigate("/purchases")}>
                                <ListItemIcon>
                                    <ShoppingBasketIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Compras"} />
                            </ListItemButton>
                        </ListItem> }
                        {getUser().role === "ADMIN" && <ListItem key={4} disablePadding>
                            <ListItemButton onClick={() => navigate("/customers")}>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Clientes"} />
                            </ListItemButton>
                        </ListItem> }
                        {getUser().role === "ADMIN" && <ListItem key={5} disablePadding>
                            <ListItemButton onClick={() => navigate("/suppliers")}>
                                <ListItemIcon>
                                    <ApartmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Fornecedores"} />
                            </ListItemButton>
                        </ListItem>}
                        {getUser().role === "ADMIN" && <ListItem key={6} disablePadding>
                            <ListItemButton onClick={() => navigate("/types")}>
                                <ListItemIcon>
                                    <ApartmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Tipos"} />
                            </ListItemButton>
                        </ListItem>}
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