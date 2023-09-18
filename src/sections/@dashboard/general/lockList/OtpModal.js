import { Stack, Divider, Modal, Box, Button, Card, TextField, Typography, Grid, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const OtpModal = ({ open, setOpen, onSubmit, form, setForm, onChangeInput, offlineDeviceList }) => {
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
              <form>
                <Grid container spacing={1} xs={12} lexDirection="column">
                  <Grid xs={12} sm={12} item lexDirection="column">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Şube Adı-Kilit Seri No.</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Şube Adı-Kilit Seri No."
                        name="deviceSeriNo"
                        // defaultValue={currentItem.operationType}
                        // onChange={handleChangeInputUpdate}
                      >
                        {offlineDeviceList.map((value, i) => (
                          <MenuItem key={`menuItem-${value.deviceSerial}-${i}`} value={value.deviceSerial}>
                            {value.deviceSerial}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* <Grid xs={12} sm={12} item lexDirection="column">
                    <TextField
                      name="deviceSeriNo"
                      label="Şube Adı-Kilit Seri No."
                      placeholder="Şube Adı-Kilit Seri No."
                      variant="outlined"
                      fullWidth
                      required
                      onChange={onChangeInput}
                      // defaultValue={currentItem.deviceSerial}
                      // inputProps={{readOnly: true}}
                    >
                      Şube Adı-Kilit Seri No.
                    </TextField>
                  </Grid> */}
                  <Grid xs={12} sm={12} item lexDirection="column">
                    <TextField
                      name="mhsTckn"
                      label="MHS T.C. Kimlik No."
                      type="number"
                      placeholder="MHS T.C. Kimlik No."
                      variant="outlined"
                      fullWidth
                      required
                      onChange={onChangeInput}
                    >
                      MHS T.C. Kimlik No.
                    </TextField>
                  </Grid>
                  <Grid xs={12} sm={12} item lexDirection="column">
                    <TextField
                      name="aCode"
                      label="A Kodu"
                      type="number"
                      placeholder="A Kodu"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={onChangeInput}
                    >
                      A Kodu
                    </TextField>
                  </Grid>
                  {/* <Grid xs={12} sm={6.1} item lexDirection="column">
                    <TextField
                      name="deviceIp"
                      label="Kilit Ip"
                      placeholder="Kilit Ip"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={onChangeInput}
                    >
                      Kullanıcı adı
                    </TextField>
                  </Grid>
                  <Grid xs={12} sm={6.1} item lexDirection="column">
                    <TextField
                      name="region"
                      label="Bölge"
                      placeholder="Bölge"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={onChangeInput}
                    >
                      Kullanıcı adı
                    </TextField>
                  </Grid>
                  <Grid xs={12} sm={6.1} item lexDirection="column">
                    <TextField
                      name="group"
                      label="Group"
                      placeholder="Group"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={onChangeInput}
                    >
                      Kullanıcı adı
                    </TextField>
                  </Grid> */}
                </Grid>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }} justifyContent="space-between">
                  <Grid xs={6} sm={6} item lexDirection="column">
                    <Button onClick={onSubmit} variant="contained" fullWidth type="submit" size="large">
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

export default OtpModal;
