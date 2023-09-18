import { Stack, Divider, Modal, Box, Button, Card, TextField, Typography, Grid, CardContent } from '@mui/material';

const AddStateModal = ({ open, setOpen, onSubmit, onChangeInput }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
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
            Eklemek istediğiniz durum bilgisini giriniz.
          </Typography>
        </Stack>
        <Stack
          xs={6}
          flexDirection="column"
          sx={{ gap: 2, mb: 2 }}
          justifyContent="flex-start"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Card>
            <CardContent titleTypographyProps={{ variant: 'h6' }}>
              <form onSubmit={onSubmit}>
                <Grid container spacing={1} xs={12} lexDirection="column">
                  <Grid xs={12} item lexDirection="column">
                    <TextField
                      name="addStatus"
                      label="Durum"
                      placeholder="Durum"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Grid xs={6} sm={6} item lexDirection="column">
                    <Button onClick={() => setOpen(false)} variant="contained" fullWidth color="inherit" size="large">
                      Değişikliklerden Vazgeç
                    </Button>
                  </Grid>
                  <Grid xs={6} sm={6} item lexDirection="column">
                    <Button variant="contained" fullWidth type="submit" size="large">
                      Gönder
                    </Button>
                  </Grid>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddStateModal;
