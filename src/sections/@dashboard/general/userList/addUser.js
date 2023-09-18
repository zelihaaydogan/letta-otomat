import {
  Stack,
  Divider,
  Modal,
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Grid,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const AddUser = ({ open, setOpen, onSubmit, onChangeInput }) => {
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
            Kullanıcı Bilgilerinizi Giriniz
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
                      name="nameSurname"
                      label="Kullanıcı Ad Soyad"
                      placeholder="Kullanıcı Ad Soyad"
                      variant="outlined"
                      fullWidth
                      required
                    >
                      Kullanıcı adı
                    </TextField>
                  </Grid>

                  <Grid xs={12} item lexDirection="column">
                    <TextField
                      label="Kullanıcı ID"
                      name="userName"
                      placeholder="Kullanıcı ID"
                      variant="outlined"
                      fullWidth
                      required
                    >
                      Kullanıcı adı
                    </TextField>
                  </Grid>
                  <Grid xs={12} item lexDirection="column">
                    <TextField
                      name="password"
                      label="Şifre"
                      type={'password'}
                      placeholder="Şifre"
                      variant="outlined"
                      fullWidth
                      required
                    >
                      Kullanıcı adı
                    </TextField>
                  </Grid>
                  <Grid xs={12} item lexDirection="column">
                    <TextField
                      name="phoneNumber"
                      label="Kullanıcı CepTelNo"
                      placeholder="Kullanıcı CepTelNo"
                      variant="outlined"
                      fullWidth
                      required
                    >
                      Kullanıcı adı
                    </TextField>
                  </Grid>
                  <Grid xs={12} item lexDirection="column">
                    <TextField
                      name="email"
                      label="Kullanıcı E-mail"
                      placeholder="Kullanıcı E-mail"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={onChangeInput}
                      type="email"
                    >
                      Kullanıcı adı
                    </TextField>
                  </Grid>
                  <Grid xs={12} item lexDirection="column">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        label="Rol"
                        placeholder="Rol"
                        onChange={onChangeInput}
                      >
                        <MenuItem value={'Admin'}>Admin</MenuItem>
                        <MenuItem value={'Kullanıcı'}>Kullanıcı</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Grid xs={6} sm={6} item lexDirection="column">
                    <Button variant="contained" fullWidth type="submit" size="large">
                      Gönder
                    </Button>
                  </Grid>
                  <Grid xs={6} sm={6} item lexDirection="column">
                    <Button onClick={() => setOpen(false)} variant="contained" fullWidth color="inherit" size="large">
                      Değişikliklerden Vazgeç
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

export default AddUser;
