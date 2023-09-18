// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack, Box, Tab, Tabs, Typography } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import useSwr from '../../../hooks/useSwr';
import { useState } from 'react';
import ReportsList from '../../../sections/@dashboard/general/reports/reportslist';
import { useEffect } from 'react';
import ReportService from '../../../services/ReportService';
import swal from 'sweetalert';
import { successToast, errorToast } from '../../../utils/toast';

// ----------------------------------------------------------------------

GeneralBanking.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------
export default function GeneralBanking() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const [data, setData] = useState(null);
  const [dataDeviceAlarm, setDataDeviceAlarm] = useState(null);
  const [currentTab, setCurrentTab] = useState('system-alarms');

  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const getAlarms = async () => {
    const response = await ReportService.getSystemAlarms();
    if (response.type === 'Success') {
      response.columnDict.map((column, index) => {
        column.flex = 1;
      });
      var newSystemData = convertData(response);
      setData(newSystemData);
    }

    const responseDevice = await ReportService.getDeviceAlarms();
    if (response.type === 'Success') {
      responseDevice.columnDict.map((column, index) => {
        column.flex = 1;
      });
      var newData = convertData(responseDevice);
      setDataDeviceAlarm(newData);
    }
  };

  useEffect(() => {
    getAlarms();
  }, []);

  const handleChange = (SyntheticEvent, newValue) => {
    setCurrentTab(newValue);
  };

  const convertData = (convert) => {
    var newData = { ...convert };
    newData.data.map((item, iter) => {
      item.id = iter;
    });
    return newData;
  };

  const handleFilterDate = async () => {
    const response = await ReportService.getTableDataByDateFilter(
      'DeviceAlarms',
      Math.floor(selectedDate.startDate / 1000),
      Math.floor(selectedDate.endDate / 1000)
    );
    if (!response) return;
    var newData = convertData(response);
    setDataDeviceAlarm(newData);
  };

  const resetAlarm = async () => {
    const response = await ReportService.setSystemAlarms();
    if (response.type === 'Success') {
      successToast(response.data);
    } else {
      errorToast(response.data);
    }
  };

  const handleFilter = () => {
    swal('Test', 'Filtreleme butonuna bastınız...', 'info');
  };

  return (
    <Page title="Raporlar">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={currentTab}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="system-alarms" label="Sistem Alarmları" />
              <Tab value="device-alarms" label="Cihaz Alarmları" />
            </Tabs>
          </Box>
          <br />
          <Box value={currentTab} sx={{ display: currentTab === 'system-alarms' ? 'initial' : 'none' }}>
            <Grid Container>
              {data && (
                <Grid item xs={12} md={12}>
                  <ReportsList
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    data={data}
                    tableHeader={'Sistem Alarmları'}
                    handleFilter={handleFilter}
                    handleFilterDate={handleFilterDate}
                    type={'system-alarms'}
                    resetAlarm={resetAlarm}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
          <Box value={currentTab} sx={{ display: currentTab === 'device-alarms' ? 'initial' : 'none' }}>
            <Grid Container>
              {dataDeviceAlarm && (
                <Grid item xs={12} md={12}>
                  <ReportsList
                    data={dataDeviceAlarm}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    handleFilterDate={handleFilterDate}
                    tableHeader={'Cihaz Alarmları'}
                    handleFilter={handleFilter}
                    type={'device-alarms'}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
