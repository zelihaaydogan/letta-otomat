// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import useSwr from '../../hooks/useSwr';
import List from '../../sections/@dashboard/general/inventory/list';
import { useEffect, useState } from 'react';
import InventoryService from '../../services/InventoryService';

// ----------------------------------------------------------------------

Inventory.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Inventory() {
  const { data } = useSwr(`Inventory/GetInventory`);
  const theme = useTheme();

  const [inventoryData, setInventoryData] = useState();
  const [listData, setListData] = useState();
  const [statusList, setStatusList] = useState();
  const { themeStretch } = useSettings();

  const convertData = (convert) => {
    var newData = { ...convert };
    newData?.data.map((item) => {
      item.id = item.deviceSerial;
    });
    return newData;
  };

  const handleFetch = async () => {
    const response = await InventoryService.getInventory();
    if (!response) return;
    const newData = convertData(response);

    setInventoryData(newData);
  };

  useEffect(() => {
    if (!data) return;
    const newData = convertData(data);
    const statusEnum = newData.columnDict.find((item) => item.field === 'description');
    setStatusList(statusEnum.enumList);
    data.columnDict.map((column) => {
      column.width = 200;
      column.flex = 1;
      if (column.field === 'model') {
        column.flex = 1;
      }
      if (column.field === '""description""') {
        column.flex = 2;
      }
    });
    setInventoryData(newData);
  }, [data]);

  return (
    <Page title="Cihazlar">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container>
          {data && (
            <Grid item xs={12} md={12}>
              <List data={inventoryData} listData={listData} handleFetch={handleFetch} statusList={statusList} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
