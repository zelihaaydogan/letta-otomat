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
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect } from 'react';
const handleDefaultValue = (value) => {
  switch (value) {
    case 'Bölge':
      return 'item.region';
    case 'İşlem Tipi':
      return 'item.operationType';
    default:
      return '';
  }
};

const UpdateModal = ({
  openUpdateModal,
  setOpenUpdateModal,
  onSubmitUpdate,
  currentItem,
  onChangeInputUpdate,
  data,
  listData,
}) => {
  const isReadOnlyField = (name) => {
    return name === 'deviceSeriNo' || name === 'deviceIp';
  };
  return (
    <Modal
      open={openUpdateModal}
      onClose={() => setOpenUpdateModal(false)}
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
          maxHeight: '600px',
          overflow: 'auto',
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
              <form onSubmit={onSubmitUpdate} data>
                <Grid container spacing={2} xs={12}>
                  {listData.map((item, i) => (
                    <Grid xs={12} sm={6} item key={`listItems-${i}`}>
                      {item.value ? (
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">{item.header}</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={item.header}
                            name={item.name}
                            defaultValue={currentItem[item.name]}
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
                          defaultValue={currentItem[item.name]}
                          id="outlined-disabled"
                          inputProps={{
                            readOnly: isReadOnlyField(item.name),
                          }}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>

                <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Grid xs={6} sm={6} item lexDirection="column">
                    <Button
                      onClick={() => setOpenUpdateModal(false)}
                      variant="contained"
                      fullWidth
                      color="inherit"
                      size="large"
                    >
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

export default UpdateModal;
