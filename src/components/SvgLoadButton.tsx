import React, { useRef, ChangeEvent } from 'react'
import { Button } from '@mui/material'

type Child = {
    children: String,
    setFileContent: any
}

const SvgLoadButton = ({ children, setFileContent }: Child) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const content = event.target?.result as string;
                setFileContent(content);
                localStorage.setItem('loadedSvg', content);
                localStorage.setItem('svgEvents', JSON.stringify({}))
            };

            reader.readAsText(selectedFile);
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                hidden={true}
                accept="image/svg+xml"
            />
            <Button
                variant="contained"
                className="bg-base-gray rounded-md"
                onClick={handleButtonClick}
            >
                {children}
            </Button>
        </>
    )
}

export default SvgLoadButton