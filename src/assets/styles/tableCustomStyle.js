const commonCellStyle = {
    fontSize: "12px",
    lineHeight: "1rem",
    borderBottom: "none",
    position: 'relative',
};

export const firstCellStyle = {
    ...commonCellStyle,
    '&::after': {
        content: '""',
        position: 'absolute',
        left: '10px', 
        bottom: 0,
        width: 'calc(100% - 10px)',
        height: '0.2px',
        backgroundColor: '#000',
    }
};

export const lastCellStyle = {
    ...commonCellStyle,
    '&::after': {
        content: '""',
        position: 'absolute',
        right: '10px', 
        bottom: 0,
        width: 'calc(100% - 10px)', 
        height: '0.2px',
        backgroundColor: '#000',
    }
};

export const cellStyle = {
    ...commonCellStyle,
    '&::after': {
        content: '""',
        position: 'absolute',
        left: '0', 
        bottom: 0,
        width: '100%',
        height: '0.2px',
        backgroundColor: '#000',
    }
};