// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import TurkeyMap from '../../components/TurkeyMap';
// sections
import { AppWidgetSummary } from '../../sections/@dashboard/general/app';
import React, { useState, useEffect, useRef } from 'react';
import MapService from '../../services/MapService';
import useSwr from '../../hooks/useSwr';
import LockListDashboard from '../dashboard';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  const [selectedCity, setSelectedCity] = useState();

  const [anchorEl, setAnchorEl] = useState(null);

  const [cities, setCities] = useState();
  const [alarms, setAlarms] = useState();

  const [openPopover, setOpenPopover] = useState(false);

  const theme = useTheme();

  const mapRef = useRef();

  const { themeStretch } = useSettings();

  useEffect(() => {
    const getData = async () => {
      const response = await MapService.getCityData();
      console.log(response);
      setCities(response.data);
    };
    getData();
  }, []);
  const { data } = useSwr(`api/Automat/GetAutomatAlarms`);

  const widget = useSwr(`api/Dashboard/GetGeneralWidgetContents`);
  const handleBgColor = (value) => {
    switch (value) {
      case 'success':
        return '#54D62C';
      case 'error':
        return '#FF4842';
      default:
        return '#FFC107';
    }
  };
  return (
    <Page title="Özet Ekranı">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {widget?.data?.data.map((item, i) => (
            <Grid key={`widget-${i}`} item xs={12} md={3}>
              <AppWidgetSummary
                title={item.title}
                percent={parseFloat(item.percentage)}
                total={item.sumValue}
                chartColor={theme.palette.primary.main}
                chartdata={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
                progressValue={Number(item.subValue.split(' ')[0])}
                progressColor={item.color}
                product={item.subValue}
                bgcolor={() => handleBgColor(item.color)}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={1}>
          {cities && <TurkeyMap cities={cities} />}
          {data && (
            <Grid item xs={12} md={12}>
              <LockListDashboard data={data} />
            </Grid>
          )}
          {/* {data && (
            <Grid item xs={12} md={12}>
              <Alarms data={data} />
            </Grid>
          )} */}
        </Grid>
      </Container>
    </Page>
  );
}
