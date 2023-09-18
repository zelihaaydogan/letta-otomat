import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import useSwr from '../../hooks/useSwr';
import { useTheme } from '@mui/material/styles';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import { LockList } from '../../sections/@dashboard/general/lockList';
import GetOfflineDeviceList from '../../services/GetOfflineDeviceList';

const GeneralEcommerce = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = useState('');

  const [offlineDevices, setOfflineDevices] = useState(null);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const { data } = useSwr('api/Automat/GetAllAutomatList');
  data?.columnDict.map((column) => {
    column.flex = 2;
    column.minWidth = 150;
  });
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  useEffect(() => {
    const fetchOfflineData = async () => {
      try {
        const response = await GetOfflineDeviceList.get();
        if (response.type === 'Success') {
          setOfflineDevices(response.data);
        } else if (response.type === 'Failed') {
          console.log("An error occurred while getting offline devices' data.");
        }
      } catch (error) {
        console.error('Error fetching offline device data:', error);
      }
    };

    fetchOfflineData();
  }, []);

  return (
    <Page title="Kilitler">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {data && (
            <Grid item xs={12} md={12}>
              <LockList data={data} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

GeneralEcommerce.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default GeneralEcommerce;
