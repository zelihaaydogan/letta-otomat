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
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material';

const AddModal = ({ open, setOpen, onSubmit, onChangeInput, listData, currentItem }) => {
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
            Kapı Bilgilerinizi Giriniz
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
            <CardContent titletypographyprops={{ variant: 'h6' }}>
              <form onSubmit={onSubmit}>
                <Grid container spacing={2} xs={12}>
                  {listData.map((item, i) => (
                    <Grid xs={12} sm={6} item key={`listItems-${i}`}>
                      {/* {data.data.find((value, i) => console.log(Object.keys(value)))} */}
                      {item.value ? (
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">{item.header}</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={item.header}
                            name={item.name}
                            fullWidth
                            // onChange={handleChangeInputUpdate}
                          >
                            {item.value.map((value, i) => (
                              <MenuItem key={`menuItem-${item.name}-${i}`} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          name={item.name}
                          label={item.header}
                          placeholder={item.header}
                          variant="outlined"
                          fullWidth
                          id="outlined-disabled"
                        >
                          Kullanıcı adı
                        </TextField>
                      )}
                    </Grid>
                  ))}
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

export default AddModal;
