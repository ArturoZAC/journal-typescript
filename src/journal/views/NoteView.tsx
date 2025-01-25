import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunk';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

  const dispatch = useAppDispatch();
  const { active: note, messageSaved, isSaving  } = useAppSelector( state => state.journal);

  const { body, title, date, onInputChange, formState } = useForm( note! );

  const dateString = useMemo(() => {
    if (!date) return '';
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [date])

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch( setActiveNote(formState));
  }, [ formState])

  useEffect(() => {
    if( messageSaved.length > 0) {
      Swal.fire('Nota Actualizada', messageSaved, 'success');
    }
  }, [messageSaved])
  
  const onSaveNote = () => {
    dispatch( startSaveNote() );
  }
  
  const onFileInputChange = ({ target } : ChangeEvent<HTMLInputElement>) => {
    if( !target.files?.length ) return;

    const filesArray = Array.from(target.files);
    dispatch(startUploadingFiles(filesArray))
  }
  
  const onDelete = () => {
    dispatch( startDeletingNote());
  }

  return (
    <Grid 
    className="animate__animated animate__fadeIn animate__faster"
    container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input 
              type="file"
              multiple
              ref={ fileInputRef }
              onChange={ onFileInputChange }
              style={{ display: 'none'}}
            />

            <IconButton
              color="primary"
              disabled={isSaving}
              onClick={ () => fileInputRef.current?.click()}
              >
              <UploadOutlined />
            </IconButton>

            <Button 
                disabled={isSaving}
                onClick={ onSaveNote }
                color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name='title'
                value={ title }
                onChange={ onInputChange }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name='body'
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
          <Button
            onClick={ onDelete }
            sx={{ mt: 2 }}
            color='error'
          >
            <DeleteOutline />
            Borrar
          </Button>
        </Grid>


        {/* Image gallery */}
        <ImageGallery images={ note?.imageUrls }/>

    </Grid>
  )
}
