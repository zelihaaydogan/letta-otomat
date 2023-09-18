import React from 'react';
import { Modal, Box, Typography, Card, CardContent, Grid, TextField, Stack, Button } from '@mui/material';

const KurulumModal = ({ open, setOpen, onSubmit }) => {
  const handleClose = () => {
    setOpen(false);
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Lütfen bilgilerinizi giriniz
        </Typography>
        <Card>
          <CardContent>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="deviceSeriNo"
                    label="Cihaz Seri No"
                    placeholder="Cihaz Seri No"
                    variant="outlined"
                    fullWidth
                    inputProps={{ type: 'string' }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="aCode"
                    label="A Code"
                    placeholder="A Code"
                    variant="outlined"
                    fullWidth
                    inputProps={{ type: 'string' }}
                  />
                </Grid>
              </Grid>
              <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={6} sm={6}>
                  <Button onClick={handleClose} variant="contained" fullWidth color="inherit" size="large">
                    {'Değişikliklerden Vazgeç'}
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button variant="contained" fullWidth type="submit" size="large" onSubmit={onSubmit}>
                    Gönder
                  </Button>
                </Grid>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default KurulumModal;
