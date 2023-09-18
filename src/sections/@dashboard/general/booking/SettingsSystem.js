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
import { useEffect, useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DashboardService from '../../../../services/DashboardService';
import { successToast, errorToast } from '../../../../utils/toast';

const SettingsSystem = ({
  openUpdateModal,
  setOpenUpdateModal,
  onSubmitUpdate,
  currentItem,
  onChangeInputUpdate,
  listData,
}) => {
  const [data, setData] = useState();
  const [showDate, setShowDate] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const response = await DashboardService.getSystemOptions();
      if (!response) return;
      const item = response.data.find((value) => value.keyField == 'isTimeUpdateEnable');
      setShowDate(item && item.valueField !== 'Kapalı');
      setData(response);
    };
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    var data = new Array();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    Object.entries(formData).map(([key, value]) => {
      data.push({ keyField: key, valueField: value });
    });
    const response = await DashboardService.updateSystemOptions(data);
    if (response.type === 'Success') {
      successToast(response.data);
    } else {
      errorToast(response.data);
    }
  };

  const handleShowDate = (value) => {
    switch (value) {
      case 'Açık':
        return setShowDate(true);
      case 'Kapalı':
        return setShowDate(false);
      default:
        return setShowDate(false);
    }
  };

  const handleDate = (value) => {
    var st = value.split('/').join('.');
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    var dt = new Date(st.replace(pattern, '$3-$2-$1'));
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    var returnedString = dt.toISOString().split(':');
    return returnedString[0] + ':' + returnedString[1];
  };
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 3 }}>
        <CardContent fullWidth>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack spacing={2} direction="column">
              {data?.columnDict.map((item, i) => (
                <Grid key={`formItem-${i}`} item xs={12} md={6} lg={4}>
                  {item.type === 'input' && (
                    <TextField
                      fullWidth
                      name={item.field}
                      label={data.data.find((value) => value.keyField === item.field)?.labelField}
                      defaultValue={data.data.find((value) => value.keyField === item.field)?.valueField}
                    />
                  )}
                  {item.type === 'select' && (
                    <>
                      <InputLabel shrink>
                        {data.data.find((value) => value.keyField === item.field)?.labelField}
                      </InputLabel>
                      <Select
                        fullWidth
                        defaultValue={data.data.find((value) => value.keyField === item.field)?.valueField}
                        label={data.data.find((value) => value.keyField === item.field)?.labelField}
                        onChange={
                          item.field === 'isTimeUpdateEnable' ? (e) => handleShowDate(e.target.value) : undefined
                        }
                        name={item.field}
                      >
                        {item.enumList.map((enumList, i) => (
                          <MenuItem key={`enum-${item.field}-${i}`} value={enumList}>
                            {enumList}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                  {item.type === 'date' && showDate && (
                    <TextField
                      fullWidth
                      id="datetime-local"
                      label={data.data.find((value) => value.keyField === item.field)?.labelField}
                      type="datetime-local"
                      defaultValue={handleDate(data.data.find((value) => value.keyField === item.field)?.valueField)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                </Grid>
              ))}
            </Stack>
            <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
              <Grid xs={6} sm={6} item>
                <Button variant="contained" fullWidth color="inherit" size="large">
                  Değişikliklerden Vazgeç
                </Button>
              </Grid>
              <Grid xs={6} sm={6} item>
                <Button variant="contained" fullWidth type="submit" size="large">
                  Gönder
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SettingsSystem;
