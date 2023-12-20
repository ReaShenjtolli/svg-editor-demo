import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ReactComponent as TrashIcon } from '../assets/icons/trash.svg'
import { ReactComponent as EditIcon } from "../assets/icons/edit_pen.svg"
import { firstCellStyle, lastCellStyle, cellStyle } from '../assets/styles/tableCustomStyle';

function createData(
    id: number,
    event_type: string,
    event_action: string

) {
    return { id, event_action, event_type };
}

const rows = [
    createData(1, "test", "test_action"),
];

export default function BasicTable() {

    return (
        <TableContainer >
            <Table sx={{
                width: "100%",
                border: "1px solid #000",
                borderRadius: "5px",
                borderCollapse: 'unset'
            }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center' sx={firstCellStyle} className='font-bold'>#</TableCell>
                        <TableCell align="center" sx={cellStyle} className='font-bold'>Event Type</TableCell>
                        <TableCell align="center" sx={cellStyle} className='font-bold'>Event Action</TableCell>
                        <TableCell align="center" sx={cellStyle}></TableCell>
                        <TableCell align="center" sx={lastCellStyle}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">{row.event_type}</TableCell>
                            <TableCell align="center">{row.event_action}</TableCell>
                            <TableCell align="center">
                                <EditIcon />
                            </TableCell>
                            <TableCell align="center">
                                <TrashIcon />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}