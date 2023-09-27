import React from 'react';
import { Modal, Button, Box, Card, CardHeader, Stack, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';

AddModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectedRowData: PropTypes.object.isRequired,
  customLabels: PropTypes.object.isRequired,
};

export default function AddModal({ isOpen, onClose, onAdd, selectedRowData, customLabels }) {
  const handleUpdateClick = async (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle

    // Form verilerini topla
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // onUpdate işlemini çağır
    await onAdd(data);

    // Modalı kapat
    onClose();
  };

  const handleDiscardClick = () => {
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          maxWidth: '100%',
          height: 'auto',
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          border: '2px solid #010',
          boxShadow: 24,
          p: 2,
          borderRadius: '12px',
          overflowY: 'auto',
        }}
      >
        <Card>
          <CardHeader title="Otomat Bilgilerini Giriniz" subheader="" sx={{ mb: 3 }} />
          <form onSubmit={handleUpdateClick}>
            <Grid container sx={{ mr: 2 }}>
              <Grid item xs={12}>
                <Stack justifyContent="space-between" sx={{ gap: 2, ml: 2 }}>
                  {Object.entries(selectedRowData).map(([key, value]) => {
                    if (
                      key === 'nodeId' ||
                      key === 'deviceId' ||
                      key === 'nodeType' ||
                      key === 'automatSerial' ||
                      key === 'name' ||
                      key === 'city' ||
                      key === 'town' ||
                      key === 'address' ||
                      key === 'latitude' ||
                      key === 'longitude' ||
                      key === 'group1' ||
                      key === 'group2' ||
                      key === 'nodeBrand' ||
                      key === 'nodeModel' ||
                      key === 'description'
                    ) {
                      return (
                        <TextField
                          key={`listItems-${key}`}
                          label={customLabels[key] || key}
                          variant="outlined"
                          defaultValue={value}
                          fullWidth
                          id="outlined-disabled"
                          name={key}
                        />
                      );
                    }
                    return null;
                  })}
                </Stack>
              </Grid>
            </Grid>
            <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mb: 2, mt: 2, mr: 2, ml: 2 }}>
              <Grid xs={6} sm={6} item>
                <Button variant="contained" fullWidth color="inherit" onClick={handleDiscardClick} size="large">
                  Değişikliklerden Vazgeç
                </Button>
              </Grid>
              <Grid xs={6} sm={6} item>
                <Button variant="contained" fullWidth type="submit" size="large">
                  Gönder
                </Button>
              </Grid>
            </Stack>
          </form>
        </Card>
      </Box>
    </Modal>
  );
}
