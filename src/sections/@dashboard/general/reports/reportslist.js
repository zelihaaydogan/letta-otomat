import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  trTR,
} from '@mui/x-data-grid';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useTheme } from '@mui/material/styles';
import { Stack, Divider, Button, TextField, Typography, Icon, Grid, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LockResetIcon from '@mui/icons-material/LockReset';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GetOfflineDeviceList from '../../../../services/GetOfflineDeviceList';

const style = {
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
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: 'Kilit Olayları',
          utf8WithBom: true,
          delimiter: ';',
        }}
        printOptions={{
          fileName: 'Kilitler Olayları',
          hideFooter: true,
          hideToolbar: true,
          allColumns: true,
        }}
      />
    </GridToolbarContainer>
  );
}
function WrappedIcon(props) {
  return <Icon {...props} />;
}
WrappedIcon.muiName = 'Icon';

export default function ReportsList({
  data,
  tableHeader,
  selectedDate,
  setSelectedDate,
  handleFilterDate,
  type,
  resetAlarm,
}) {
  const [form, setForm] = useState({});
  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [selectedLocksIds, setSelectedLocksIds] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [offlineDeviceList, setOfflineDeviceList] = useState(null);

  const handleSelectRow = (id) => {
    setSelectedLocksIds(id);
    const item = data.data.find((item) => item.deviceSerial === id[0]);
    console.log(item);
    if (!item) return;
    setCurrentItem(item);
  };

  useEffect(() => {
    const getOfflineData = async () => {
      const response = await GetOfflineDeviceList.get();
      if (response.type === 'Success') {
        setOfflineDeviceList(response.data);
      } else {
        console.log('An error occured while getting offline device list!');
      }
    };
    getOfflineData();
  }, []);

  const { push } = useRouter();

  const theme = useTheme();
  //--------------------Date Picker--------------------------------

  const handleDateChange = (value, name) => {
    setSelectedDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div style={{ height: 620, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="span" mb={2}>
              {tableHeader}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Stack
              flexDirection="row"
              sx={{ gap: 2, mb: 2 }}
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="flex-end"
            >
              {/* <Button onClick={handleOpen} variant="outlined" startIcon={<LockIcon />} color="primary" disabled={selectedLocksIds.length > 1 || selectedLocksIds.length === 0}> */}
              {tableHeader === 'Sistem Alarmları' && (
                <Button onClick={() => resetAlarm()} variant="outlined" startIcon={<LockResetIcon />} color="warning">
                  Sayacı Sıfırla
                </Button>
              )}
              {(type === 'device-alarms' || type === 'completed-op' || type === 'lock-event') && (
                <Stack flexDirection="row" sx={{ gap: 1 }}>
                  <DesktopDatePicker
                    label="Başlangıç Tarihi"
                    inputFormat="DD/MM/YYYY"
                    name="startDate"
                    disableFuture
                    value={selectedDate.startDate}
                    onChange={(value) => handleDateChange(value, 'startDate')}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <DesktopDatePicker
                    label="Bitiş  Tarihi"
                    inputFormat="DD/MM/YYYY"
                    name="endDate"
                    disableFuture
                    value={selectedDate.endDate}
                    onChange={(value) => handleDateChange(value, 'endDate')}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Button
                    onClick={handleFilterDate}
                    variant="outlined"
                    disabled={selectedDate.startDate === null || selectedDate.endDate === null}
                    startIcon={<CalendarMonthIcon />}
                    color="primary"
                  >
                    Tarihe Göre Filtrele
                  </Button>
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
        <DataGrid
          localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          rows={data.data}
          columns={data.columnDict}
          rowsPerPageOptions={[5, 10, 25]}
          sortingOrder={['desc', 'asc']}
          getRowId={(rows) => rows.id}
          initialState={{
            ...data.initialState,
            pagination: {
              pageSize: 10,
            },
            sorting: {
              sortModel: [
                {
                  field: 'commodity',
                  sort: 'asc',
                },
              ],
            },
          }}
          components={{ Toolbar: CustomToolbar }}
          disableSelectionOnClick
          autoHeight={true}
          onSelectionModelChange={(data) => {
            handleSelectRow(data);
          }}
        />
      </div>
    </>
  );
}
