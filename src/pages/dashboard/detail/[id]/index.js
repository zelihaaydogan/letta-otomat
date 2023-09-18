// next
import { useRouter } from 'next/router';
// @mui
import { Container, Grid, Typography, Box, Card, Button, CardContent, Tab, Tabs, ButtonBase, Img } from '@mui/material';
// _mock_
import { _invoices } from '../../../../_mock';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
// sections
import Invoice from '../../../../sections/@dashboard/invoice/details';

import React, { useState, SyntheticEvent } from 'react';

import DeviceDetails from '../../../../services/DeviceDetails';
import { useEffect } from 'react';

import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import LockIcon from '@mui/icons-material/Lock';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import AnalyticsWidgetSummaryCustom from '../../../../sections/@dashboard/general/analytics/AnalyticsWidgetSummaryCustom';
import RectangleIcon from '@mui/icons-material/Rectangle';
import DeviceLogs from '../../../../services/DeviceLogs';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  trTR,
} from '@mui/x-data-grid';
import { visuallyHidden } from '@mui/utils';
import { successToast, errorToast } from '../../../../utils/toast';

const DeviceStatus = {
  DoorStat: 'Kapı Durumu',
  BatteryLevel: 'Pil Seviyesi',
  LockStat: 'Kilit Durumu',
  NetboxStat: 'Netbox Durumu',
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: 'Loglar',
          utf8WithBom: true,
          delimiter: ';',
        }}
        printOptions={{
          fileName: 'Loglar',
          hideFooter: true,
          hideToolbar: true,
          allColumns: true,
        }}
      />
    </GridToolbarContainer>
  );
}

// ----------------------------------------------------------------------

InvoiceDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { id } = query;

  const invoice = _invoices.find((invoice) => invoice.id === id);

  const [details, setDetails] = useState(null);

  const [deviceLogs, setDeviceLogs] = useState(null);
  const [data, setData] = useState();

  const handleColor = (color) => {
    switch (color) {
      case 'Çevrimiçi':
        return 'success';
      case 'Çevrimdışı':
        return 'error';
      default:
        return 'warning';
    }
  };
  const handleIcon = (icon) => {
    switch (icon) {
      case 'LockStat':
        return <LockIcon />;
      case 'DoorStat':
        return <DoorFrontIcon />;
      case 'BatteryLevel':
        return <BatteryStdIcon />;
      default:
        return <RectangleIcon />;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await DeviceDetails.get(id);
      if (response.type === 'Success') {
        setDetails(response.data);
      } else if (response.type === 'Failed') {
        errorToast(response.data);
      }

      const logs = await DeviceLogs.get(response.data.doorId);
      if (logs.type === 'Success') {
        setDeviceLogs(logs);
      } else if (logs.type === 'Failed') {
        errorToast(response.data);
      }
    };
    getData();
  }, []);

  const [value, setValue] = useState('pano');

  const handleChange = (SyntheticEvent, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Kapı Detayları">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <CardContent>
            {/* <Box sx={{ mb: 5 }}> */}
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 'auto', height: 'auto' }}>
                    <Button variant="contained" size="large" color={handleColor(details?.status || '')}>
                      {details ? (details.status ? details.status : '--') : '--'}
                    </Button>
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="span">
                        {`Kapı Kodu: ${details?.doorId || '--'}`}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {`Şube Adı: ${details?.description || '--'}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Bölge: ${details?.region || '--'}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
        <br />
        <br />
        <Card>
          <CardContent>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value="pano" label="Özet Ekranı" />
                  <Tab value="loglar" label="Loglar" />
                </Tabs>
              </Box>
              <br />
              <Box value={value} sx={{ display: value === 'pano' ? 'initial' : 'none' }}>
                <Grid container spacing={3}>
                  {details?.widgets.map((item) => (
                    <Grid key={item.key} item xs={12} sm={6} md={3}>
                      <AnalyticsWidgetSummaryCustom
                        title={DeviceStatus[item.key]}
                        total={item.value || '--'}
                        color={item.color}
                        icon={handleIcon(item?.key) || ''}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box value={value} sx={{ display: value === 'loglar' ? 'initial' : 'none' }}>
                {deviceLogs && (
                  <DataGrid
                    style={{ visuallyHidden }}
                    className="heightAuto visuallyHidden "
                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                    rows={deviceLogs.data}
                    columns={deviceLogs.columnDict}
                    autoHeight={true}
                    pageSize={8}
                    rowsPerPageOptions={[5, 10, 25]}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                    getRowHeight={() => 'auto'}
                    sortingOrder={['desc', 'asc']}
                    initialState={{
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
                  />
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Invoice invoice={invoice} />
      </Container>
    </Page>
  );
}
