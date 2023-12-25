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
import { deleteEvent, receiveEvents } from '../../lib/localStorageEvents';

type DataType = {
    id: string,
    event_type: string,
    event_action: string
}

export default function TableEventList({ elementId }: { elementId: string | null | undefined }) {

    const [modalState, setModalState] = useState({ openDelete: false, openEditEvents: false });
    const [selectedItem, setSelectedItem] = useState<DataType>({ id: '', event_type: '', event_action: '' });

    const events = elementId ? receiveEvents(elementId) : []

    function handleModalAction(item: DataType, action: 'edit' | 'delete') {
        setSelectedItem(item);

        setModalState({
            openDelete: action === 'delete',
            openEditEvents: action === 'edit'
        });
    };

    const handleCloseModal = () => setModalState({ openDelete: false, openEditEvents: false });

    const handleConfirmDelete = () => {
        if(elementId)
            deleteEvent(elementId, parseInt(selectedItem.id))

        handleCloseModal();
    };

    return (
        <React.Fragment>
            <DeleteModal
                open={modalState.openDelete}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                itemName={selectedItem.event_type}
                itemId={selectedItem.id}
            />
            <AddEventModal
                header={"Edit Events"}
                open={modalState.openEditEvents}
                setOpen={(open: boolean) => setModalState({ ...modalState, openEditEvents: open })}
                elementId={elementId}
                editEvents={selectedItem}
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
                    <TableBody className='mb-2.5'>
                        {events.length === 0 ?
                            <TableRow>
                                <TableCell colSpan={5}>No events found</TableCell>
                            </TableRow>
                            :
                            events.map((row: DataType, index: number) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={index === events.length - 1 ? commonCellStyle : firstCellStyle}
                                    >
                                        {row.id}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={index === events.length - 1 ? commonCellStyle : cellStyle}
                                    >
                                        {row.event_type}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={index === events.length - 1 ? commonCellStyle : cellStyle}
                                    >
                                        {row.event_action}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={index === events.length - 1 ? commonCellStyle : cellStyle}
                                        onClick={() => handleModalAction(row, 'edit')}
                                    >
                                        <EditIcon className='cursor-pointer' />
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={index === events.length - 1 ? commonCellStyle : lastCellStyle}
                                        onClick={() => handleModalAction(row, 'delete')}
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