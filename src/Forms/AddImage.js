import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const AddImage = props => {

    const [imageUrl, setImageUrl] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        props.onImageChange(file);
        setImageUrl(URL.createObjectURL(file));
    }, []);


    const {getRootProps, getInputProps} = useDropzone({onDrop})


    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <div><img style={{width: '300px'}} src={imageUrl}/></div>
            </aside>
        </section>
    );
}

export default AddImage;