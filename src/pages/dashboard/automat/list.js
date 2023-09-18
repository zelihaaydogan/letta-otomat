// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
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
import BankingRecentTransitions from '../../../sections/@dashboard/general/banking/BankingRecentTransitions';
import AutomatService from '../../../services/AutomatService';
// ----------------------------------------------------------------------

GeneralAnalytics.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [automatData, setAutomatData] = useState();
  const [automatTableLabels, setAutomatTableLabels] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AutomatService.getNodeWithObjectList();
        if (response.returnCode === 1) {
          console.log(response.data);
          setAutomatData(response.data);
          setAutomatTableLabels(response.columnDict);
        } else {
          console.error('Veri alınamadı.');
        }
      } catch (error) {
        console.error('Veri çekerken bir hata oluştu:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Page title="Otomatlar">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid Container>
          <Grid item xs={12} md={12}>
            <BankingRecentTransitions
              title="Otomatlar"
              tableData={automatData}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
              tableLabels={[
                { id: '' },
                {
                  id: 'description',
                  label: 'Cihaz SeriNo / Cihaz Adı / Lokasyon / Satış Derecelendirmesi',
                  width: 180,
                },
                { id: 'date', label: 'Satış / Son Ziyaret / Biriken Nakit', width: 380 },
                { id: 'amount', label: 'Alarm', width: 180 },
                { id: 'status', label: 'Stok Seviyesi', width: 180 },
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
                { id: '' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}