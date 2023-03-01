import { Stack } from "@mui/system";
import React from "react";


const DataDisplay = ({label, value}) => {
    return (
        <Stack>
            <strong>{label}</strong>
            <span>{value}</span>
        </Stack> 
    );
}

export default DataDisplay;
