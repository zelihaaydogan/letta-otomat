import {
  Stack,
  Divider,
  Modal,
  Box,
  FormControlLabel,
  FormGroup,
  Typography,
  Checkbox,
  Button,
  Link,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState } from 'react';
import DoorService from '../../../../services/DoorService';
import { successToast, errorToast } from '../../../../utils/toast';

const ImportModal = ({ open, setOpen, onSubmit, onChangeInput, handleFetchDoors }) => {
  const [file, setFile] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClose = () => {
    setOpen(false);
    setFile(false);
    setRefresh(false);
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file[0]);
    const response = await DoorService.importDoors(refresh, formData);
    if (response.type === 'Success') {
      handleFetchDoors();
      if (response.data.successCount == 0 && response.data.errorCount == 0) errorToast(`Eklenecek kapı bulunamadı.`);
      if (response.data.successCount > 0) successToast(`${response.data.successCount} adet kapı başarıyla eklendi.`);
      if (response.data.errorCount > 0) errorToast(`${response.data.errorCount} adet kapı eklenirken hata oluştu.`);
    } else {
      errorToast(response.data);
    }
  };
  const onDownload = () => {
    const link = document.createElement('a');
    link.download = `download.txt`;
    link.href = './download.txt';
    link.click();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          borderRadius: '12px',
        }}
      >
        <Stack xs={4} flexDirection="row" sx={{ gap: 2, mb: 2 }} justifyContent="flex-start">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Dosya Yükleyiniz
          </Typography>
        </Stack>
        <Stack
          xs={6}
          flexDirection="column"
          sx={{ gap: 2, mb: 2 }}
          justifyContent="flex-start"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box sx={{ width: '100%', borderRadius: '8px', border: '1px dashed #fff', p: 5 }} {...getRootProps()}>
            <input {...getInputProps()} />
            {!file ? (
              <>
                {isDragActive ? (
                  <Typography variant="h6" component="h6">
                    Dosyayı buraya bırakın.
                  </Typography>
                ) : (
                  <Typography variant="h6" component="h6">
                    Dosya yüklemek için sürükle bırak.
                  </Typography>
                )}
              </>
            ) : (
              <>
                <Stack alignItems={'center'}>
                  <InsertDriveFileIcon />
                  <Typography variant="body1" component="span">
                    {file[0].name}
                  </Typography>
                </Stack>
              </>
            )}
          </Box>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={refresh} onChange={() => setRefresh((prev) => !prev)} />}
              label="Var olan veriler güncellensin mi?"
            />
            <Link
              href="/assets/ornek.xlsx"
              color="inherit"
              variant="body2"
              passHref
              legacyBehavior
              underline="always"
              download="ornek"
            >
              {'Örnek dosyayı indirin'}
            </Link>
          </FormGroup>
        </Stack>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button onClick={handleClose} variant="contained" fullWidth color="inherit" size="large">
            Değişikliklerden Vazgeç
          </Button>
          <Button onClick={handleSubmit} variant="contained" fullWidth type="button" size="large">
            Gönder
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ImportModal;
