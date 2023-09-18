import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
import Layout from '../../../layouts';
import Page from '../../../components/Page';
import EvenTable from '../../../sections/@dashboard/general/reports/eventable';
import useSwr from '../../../hooks/useSwr';
import swal from 'sweetalert';
import ReportService from '../../../services/ReportService';
import useSettings from '../../../hooks/useSettings';
import { errorToast } from '../../../utils/toast';

AllEvent.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function AllEvent() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const [webEventsData, setWebEventsData] = useState(null);
  const [dataDeviceAlarm, setDataDeviceAlarm] = useState(null);

  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ReportService.getAllWebEvents();
      if (response.type === 'Success') {
        const newData = { ...response };
        newData.columnDict.map((i) => {
          i.width = 100;
          i.flex = 1;
          if (i.field === 'description') {
            i.flex = 4;
          }
          if (i.field === '"tableName"') {
            i.flex = 2;
          }
        });
        newData.data.map((item) => {
          item.id = item.epoc;
          return item;
        });
        setWebEventsData(newData);
      } else {
        console.log('Error fetching web events:', response.error);
        errorToast('Error', 'An error occurred while fetching web events', 'error');
      }
    } catch (error) {
      console.error('Error fetching web events:', error);
      errorToast('Error', 'An error occurred while fetching web events', 'error');
    }
  };
  const setStartOfDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0); // Başlangıç saati 00:00:00
    return newDate;
  };

  const setEndOfDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999); // Bitiş saati 23:59:59.999
    return newDate;
  };

  const handleFilterDate = async () => {
    try {
      const startOfDay = setStartOfDate(selectedDate.startDate);
      const endOfDay = setEndOfDate(selectedDate.endDate);

      const response = await ReportService.getTableDataByDateFilter(
        'webevents',
        Math.floor(startOfDay / 1000),
        Math.floor(endOfDay / 1000)
      );
      if (response) {
        const newData = { ...response };
        newData.data.map((item) => {
          item.id = item.epoc;
          return item;
        });
        setWebEventsData(newData);
      }
    } catch (error) {
      console.error('Error filtering web events:', error);
      swal('Error', 'An error occurred while filtering web events', 'error');
    }
  };
  return (
    <Page title="Raporlar">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid Container>
          {webEventsData && (
            <Grid item xs={12} md={12}>
              <EvenTable
                data={webEventsData}
                tableHeader={'Arayüz İşlemleri'}
                type={'lock-event'}
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
