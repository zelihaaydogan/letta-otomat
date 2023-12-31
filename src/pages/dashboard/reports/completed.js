// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import { UserList } from '../../../sections/@dashboard/general/userList';
import useSwr from '../../../hooks/useSwr';
import { useEffect, useState } from 'react';
import ReportService from '../../../services/ReportService';
import ReportsList from '../../../sections/@dashboard/general/reports/reportslist';
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

  useEffect(() => {
    const getData = async () => {
      const response = await ReportService.getAllEndedOperations();
      if (response.type === 'Success') {
        response.columnDict.map((column) => {
          column.flex = 1;
        });
        const newData = convertData(response);
        setData(newData);
      }
    };
    getData();
  }, []);
  //----Date Picker-----------
  const [dataDeviceAlarm, setDataDeviceAlarm] = useState(null);
  const [currentTab, setCurrentTab] = useState('system-alarms');

  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const convertData = (convert) => {
    var newData = { ...convert };
    convert.data.map((item) => {
      item.id = item.tarihSaat;
    });
    return convert;
  };

  const handleFilterDate = async () => {
    const response = await ReportService.getTableDataByDateFilter(
      'EndedOperations',
      Math.floor(selectedDate.startDate / 1000),
      Math.floor(selectedDate.endDate / 1000)
    );
    if (!response) return;
    var newData = convertData(response);
    setData(newData);
  };

  return (
    <Page title="Raporlar">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid Container>
          {data && (
            <Grid item xs={12} md={12}>
              <ReportsList
                data={data}
                tableHeader={'Tamamlanmış Operasyonlar'}
                type={'completed-op'}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                handleFilterDate={handleFilterDate}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
