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

type dataType = {
    id: string,
    event_type: string,
    event_action: string
}

function createData(
    id: string,
    event_type: string,
    event_action: string
) {
    return { id, event_action, event_type };
}

const rows = [
    createData("1", "test1", "test_action"),
    createData("2", "test2", "test_action"),
    createData("3", "test3", "test_action"),
    createData("4", "click", "test_action"),

];

export default function TableEventList({ elementId }: { elementId: string | null | undefined }) {

    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openEditEvents, setOpenEditEvents] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<{ type: string, action: string }>({ type: '', action: '' });

    function handleEdit(item: dataType) {
        setSelectedItem({ type: item.event_type, action: item.event_action })
        setOpenEditEvents(true);
    };


    function handleDelete(item: dataType) {
        setSelectedItem({ type: item.event_type, action: item.event_action })
        setOpenDelete(true);
    };

    const handleCloseModal = () => {
        setOpenDelete(false);
    };

    const handleConfirmDelete = () => {
        console.log(`Item deleted: ${selectedItem.type}`);
        handleCloseModal();
    };

    return (
        <React.Fragment>
            <DeleteModal
                open={openDelete}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                itemName={selectedItem.type}
            />
            <AddEventModal
                open={openEditEvents}
                setOpen={setOpenEditEvents}
                id={elementId}
                event_type={selectedItem.type}
                event_action={selectedItem.action}
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
                                    onClick={() => handleEdit(row)}
                                >
                                    <EditIcon className='cursor-pointer' />
                                </TableCell>
                                <TableCell align="center"
                                    sx={index === rows.length - 1 ? commonCellStyle : lastCellStyle}
                                    onClick={() => handleDelete(row)}
                                >
                                    <TrashIcon className='cursor-pointer' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}