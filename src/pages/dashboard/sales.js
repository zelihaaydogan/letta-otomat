// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Card, CardHeader } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// _mock_
import { _analyticPost, _analyticOrderTimeline, _analyticTraffic } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import {
  AnalyticsTasks,
  AnalyticsNewsUpdate,
  AnalyticsOrderTimeline,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
  AnalyticsCurrentSubject,
  AnalyticsConversionRates,
  AnalyticsFilter,
} from '../../sections/@dashboard/general/analytics';
import { Analytics } from '@mui/icons-material';

import SalesService from '../../services/SalesService';
import { useEffect, useState } from 'react';
import { GridToolbar, DataGrid } from '@mui/x-data-grid';
// ----------------------------------------------------------------------

GeneralAnalytics.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const theme = useTheme();

  const { themeStretch } = useSettings();
  const [salesData, setSalesData] = useState();
  const [salesLabel, setSalesLabel] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await SalesService.getSales();

      if (response.returnCode === 1) {
        const updatedLabels = response.columnDict
          .filter((item) => item.field !== 'id')
          .map((item) => ({
            ...item,
            resizable: false,
            flex: 1,
            minWidth: 220,
          }));
        setSalesLabel(updatedLabels);

        const enumList = response.columnDict.find((item) => item.field === 'salesMethod').enumList.split(',');

        const updatedData = response.data.map((item) => {
          // Satış yöntemini enumList'e göre güncelle
          if (enumList[item.salesMethod]) {
            if (enumList[item.salesMethod] === 'Cashless') {
              item.salesMethod = 'Kart';
            } else {
              item.salesMethod = 'Nakit';
            }
          }
          return item;
        });
        setSalesData(updatedData);
      }
    };

    getData();
  }, []);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SalesService.getSalesSummary();
        if (response.returnCode === 1) {
          setSummary(response.data);
        } else {
          console.error('Veri alınamadı.');
        }
      } catch (error) {
        console.error('Veri çekerken bir hata oluştu:', error);
      }
    };

    fetchData();
  }, []);
  const handleTitle = (value) => {
    switch (value) {
      case 'Cash':
        return 'Nakit';
      case 'Cashless':
        return 'Kart';
      default:
        return 'Toplam';
    }
  };
  const handleIcon = (value) => {
    switch (value) {
      case 'Cash':
        return 'iconoir:hand-cash';
      case 'Cashless':
        return 'bi:credit-card';
      default:
        return 'fluent:money-24-filled';
    }
  };

  return (
    <Page title="Genel: Raporlar & Analizler">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {summary?.map((item, i) => (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <AnalyticsWidgetSummary
                  title={handleTitle(item.key)}
                  total={item.value}
                  color="success"
                  icon={handleIcon(item.key)}
                  lastUpdateTime={'Son 24 saat'}
                />
              </Grid>
              {/* <Grid key={`widget-${i}`} item xs={12} md={6}>
                <BankingWidgetSummary
                  title={item.key === 'Cash' ? 'Nakit' : 'Kart'}
                  color="warning"
                  icon={'eva:diagonal-arrow-right-up-fill'}
                  percent={-0.5}
                  total={item.value}
                  chartData={item.graphList}
                />
              </Grid> */}
            </>
          ))}
          {salesData && salesLabel && (
            <Grid item xs={12} sm={12} md={12}>
              <Card>
                <CardHeader title="Satışlar" subheader="" sx={{ mb: 3 }} />
                {/* Card bileşenini iç içe yerleştirin */}
                <DataGrid
                  rows={salesData}
                  columns={salesLabel}
                  rowsPerPageOptions={[5, 10, 25]}
                  sortingOrder={['desc', 'asc']}
                  initialState={{
                    ...salesData.initialState,
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
                  components={{ Toolbar: GridToolbar }}
                  disableSelectionOnClick
                  autoHeight={true}
                />
              </Card>
            </Grid>
          )}

          {/* <Grid item xs={12} md={6} lg={12}>
            <AnalyticsConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate title="News Update" list={_analyticPost} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline title="Order Timeline" list={_analyticOrderTimeline} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite title="Traffic by Site" list={_analyticTraffic} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
