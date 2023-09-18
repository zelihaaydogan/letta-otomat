// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// _mock_
// components
import Page from '../../../components/Page';
// sections
import React from 'react';
import { useEffect, useState } from 'react';
import BankingDetail from '../../../sections/@dashboard/general/banking/BankingDetail';
import { useRouter } from 'next/router';
import AutomatService from '../../../services/AutomatService';
import BankingTable from '../../../sections/@dashboard/general/banking/BankingTable';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------

AutomatDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// ----------------------------------------------------------------------

export default function AutomatDetail() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  let { query } = useRouter();
  const { id } = query;

  AutomatDetail.getInitialProps = async ({ query }) => {
    const { id } = query;

    return { id };
  };

  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await AutomatService.GetNodeWithObjectByNodeId(id);

        if (response.returnCode === 1) {
          setDetailData(response);
        } else {
          // Hata durumunda burada işlem yapabilirsiniz
          console.error('Veri alınamadı.');
        }
      } catch (error) {
        // Hata yakalama durumunda burada işlem yapabilirsiniz
        console.error('Veri çekerken bir hata oluştu:', error);
      }
    };

    getData();
  }, []);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AutomatService.getNodeTelemetryListByNodeId(id);

        if (response.returnCode === 1) {
          console.log(response.data);

          setRows(response.data);
        } else {
          console.error('Veri alınamadı.');
        }
      } catch (error) {
        console.error('Veri çekerken bir hata oluştu:', error);
      }
    };

    fetchData();
  }, [id]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Otomat Detay">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          {detailData?.data?.[0] && (
            <Grid item xs={12} md={12}>
              <BankingDetail
                category={detailData.data[0].category}
                name={detailData.data[0].name}
                location={detailData.data[0].location}
                rating={detailData.data[0].rating}
                data={detailData.data[0]}
              />
            </Grid>
          )}

          <Grid item xs={12} md={12} margin={2}>
            <Card spacing={3}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: 3 }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Slotlar" {...a11yProps(0)} />
                    <Tab label="Ayarlar" {...a11yProps(1)} />
                    <Tab label="Geçmiş" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <></>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  Item Two
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  {rows && (
                    <Box sx={{ height: 'auto', width: '100%' }}>
                      <BankingTable
                        tableData={rows}
                        chartColor={theme.palette.primary.main}
                        chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
                        tableLabels={[
                          { id: 'date', label: 'Tarih', width: 380 },
                          { id: 'amount', label: 'Alarm', width: 180 },

                          { id: 'status', label: 'Slot1', width: 180 },
                          { id: 'status', label: 'Slot2', width: 180 },
                          { id: 'status', label: 'Slot3', width: 180 },
                          { id: 'status', label: 'Slot4', width: 180 },
                          { id: 'status', label: 'Slot5', width: 180 },
                          { id: 'status', label: 'Slot6', width: 180 },
                          { id: 'status', label: 'Slot7', width: 180 },
                          { id: 'status', label: 'Slot8', width: 180 },
                          { id: 'status', label: 'Slot9' },
                          { id: 'status', label: 'Slot10' },
                          { id: 'status', label: 'Slot11' },
                          { id: 'status', label: 'Slot12' },
                          { id: 'status', label: 'Slot13' },
                          { id: 'status', label: 'Slot14' },
                          { id: 'status', label: 'Slot15' },
                          { id: 'status', label: 'Slot16' },
                        ]}
                      />
                    </Box>
                  )}
                </CustomTabPanel>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
