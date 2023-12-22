import React, { useState } from 'react';
import DeleteModal from './DeleteModal'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'
import { ReactComponent as EditIcon } from "../../assets/icons/edit_pen.svg"
import {
    commonCellStyle,
    firstCellStyleHead,
    lastCellStyleHead,
    cellStyleHead,
    firstCellStyle,
    lastCellStyle,
    cellStyle
} from '../../assets/styles/tableCustomStyle';
import AddEventModal from './AddEventModal';

function createData(
    id: number,
    event_type: string,
    event_action: string

) {
    return { id, event_action, event_type };
}

const rows = [
    createData(1, "test1", "test_action"),
    createData(2, "test2", "test_action"),
    createData(3, "test3", "test_action"),

];

export default function BasicTable() {

    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openEditEvents, setOpenEditEvents] = useState<boolean>(false)

    const item = 'test'

    const handleCloseModal = () => {
        setOpenDelete(false);
    };

    const handleConfirmDelete = () => {
        console.log("Item deleted"); // Replace with your delete logic
        handleCloseModal();
    };

    return (
        <React.Fragment>
            <DeleteModal
                open={openDelete}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                itemName={item}
            />
            <AddEventModal
                open={openEditEvents}
                setOpen={setOpenEditEvents}
                id={"test"}
            />
            <TableContainer>
                <Table sx={{
                    width: "100%",
                    border: "1px solid #000",
                    borderRadius: "5px",
                    borderCollapse: 'unset',
                    position: "relative"
                }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' sx={firstCellStyleHead} className='font-bold'>#</TableCell>
                            <TableCell align="center" sx={cellStyleHead} className='font-bold'>Event Type</TableCell>
                            <TableCell align="center" sx={cellStyleHead} className='font-bold'>Event Action</TableCell>
                            <TableCell align="center" sx={cellStyleHead}></TableCell>
                            <TableCell align="center" sx={lastCellStyleHead}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <TableCell component="th" scope="row" sx={index === rows.length - 1 ? commonCellStyle : firstCellStyle}>
                                    {row.id}
                                </TableCell>
                                <TableCell align="center" sx={index === rows.length - 1 ? commonCellStyle : cellStyle}>
                                    {row.event_type}
                                </TableCell>
                                <TableCell align="center" sx={index === rows.length - 1 ? commonCellStyle : cellStyle} >
                                    {row.event_action}
                                </TableCell>
                                <TableCell align="center"
                                    sx={index === rows.length - 1 ? commonCellStyle : cellStyle}
                                    onClick={() => setOpenEditEvents(true)}
                                >
                                    <EditIcon />
                                </TableCell>
                                <TableCell align="center"
                                    sx={index === rows.length - 1 ? commonCellStyle : lastCellStyle}
                                    onClick={() => setOpenDelete(true)}
                                >
                                    <TrashIcon style={{ cursor: "pointer" }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}