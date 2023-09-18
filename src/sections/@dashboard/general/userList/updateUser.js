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

const AddUser = ({ open, setOpen, onSubmit, onChangeInput, currentItem }) => {
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
                <Stack spacing={2}>
                  <TextField
                    name="nameSurname"
                    label="Kullanıcı Ad Soyad"
                    placeholder="Kullanıcı Ad Soyad"
                    variant="outlined"
                    fullWidth
                    defaultValue={currentItem.nameSurname}
                    required
                  />

                  <TextField
                    label="Kullanıcı Adı"
                    name="userName"
                    placeholder="Kullanıcı Adı"
                    variant="outlined"
                    fullWidth
                    defaultValue={currentItem.userName}
                    required
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <TextField
                    name="password"
                    label="Şifre"
                    type="password"
                    placeholder="Şifre"
                    defaultValue={currentItem.password}
                    variant="outlined"
                    fullWidth
                    required
                  />

                  <TextField
                    name="phoneNumber"
                    label="Kullanıcı CepTelNo"
                    defaultValue={currentItem.phoneNumber}
                    placeholder="Kullanıcı CepTelNo"
                    variant="outlined"
                    fullWidth
                    required
                  />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Durum</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="status"
                      label="Durum"
                      defaultValue={currentItem.status}
                      placeholder="Durum"
                      onChange={onChangeInput}
                    >
                      <MenuItem value="Aktif">Aktif</MenuItem>
                      <MenuItem value="Pasif">Pasif</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    name="email"
                    label="Kullanıcı E-mail"
                    placeholder="Kullanıcı E-mail"
                    variant="outlined"
                    defaultValue={currentItem.email}
                    fullWidth
                    required
                    onChange={onChangeInput}
                    type="email"
                  />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="role"
                      label="Rol"
                      defaultValue={currentItem.role}
                      placeholder="Rol"
                      onChange={onChangeInput}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Kullanıcı">Kullanıcı</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button onClick={() => setOpen(false)} variant="contained" fullWidth color="inherit" size="large">
                    Değişikliklerden Vazgeç
                  </Button>
                  <Button variant="contained" fullWidth type="submit" size="large">
                    Gönder
                  </Button>
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
