export const commonCellStyle = {
    fontSize: "10px",
    lineHeight: "0.5rem",
    borderBottom: "none",
    position: 'relative',
};

const commonAfterStyles = {
    content: '""',
    position: 'absolute',
    bottom: 0,
    height: '0.2px',
};

export const firstCellStyleHead = {
    ...commonCellStyle,
    '&::after': {
        ...commonAfterStyles,
        left: '10px', 
        width: 'calc(100% - 10px)',
        backgroundColor: '#000',
    }
};

export const lastCellStyleHead = {
    ...commonCellStyle,
    '&::after': {
        ...commonAfterStyles,
        right: '10px', 
        width: 'calc(100% - 10px)',
        backgroundColor: '#000',
    }
};

export const cellStyleHead = {
    ...commonCellStyle,
    '&::after': {
        ...commonAfterStyles,
        left: '0', 
        width: '100%',
        backgroundColor: '#000',
    }
};

const commonNonHeaderCellStyle = {
    ...commonCellStyle,
    '&::after': {
        ...commonAfterStyles,
        backgroundColor: 'rgba(224, 224, 224, 1)',
    }
};

export const firstCellStyle = {
    ...commonNonHeaderCellStyle,
    '&::after': {
        ...commonNonHeaderCellStyle['&::after'],
        left: '10px',
        width: 'calc(100% - 10px)',
    }
};

export const lastCellStyle = {
    ...commonNonHeaderCellStyle,
    '&::after': {
        ...commonNonHeaderCellStyle['&::after'],
        right: '10px',
        width: 'calc(100% - 10px)',
    }
};

export const cellStyle = {
    ...commonNonHeaderCellStyle,
    '&::after': {
        ...commonNonHeaderCellStyle['&::after'],
        left: '0',
        width: '100%',
    }
};