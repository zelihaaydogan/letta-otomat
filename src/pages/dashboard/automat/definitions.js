// @mui
import { Card, Button, Container } from '@mui/material';
// redux
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider, CardHeader } from '@mui/material';
import { useEffect, useState } from 'react';
import AutomatService from '../../../services/AutomatService';
import { GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import AddModal from '../../../sections/@dashboard/general/AddModal';
import UpdateModal from '../../../sections/@dashboard/general/UpdateModal';
import { successToast, errorToast } from '../../../utils/toast';
import { DataGrid } from '@mui/x-data-grid';
import { visuallyHidden } from '@mui/utils';

// ----------------------------------------------------------------------

AutomatDefinitions.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
export default function AutomatDefinitions() {
  const { themeStretch } = useSettings();
  const [automatData, setAutomatData] = useState();
  const [automatTableLabels, setAutomatTableLabels] = useState();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState([]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async (e) => {
    try {
      const form = new FormData(e.target);
      const formData = Object.fromEntries(form.entries());

      const updateResponse = await AutomatService.updateAutomat(formData);
      if (updateResponse.type === 'Failed') {
        errorToast(updateResponse.data);
      } else {
        successToast(updateResponse.data);
      }

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Güncelleme sırasında bir hata oluştu:', error);
      // Hata işleme burada yapılabilir, örneğin bir hata toast gösterilebilir.
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await AutomatService.getNodeWithObjectList();
      if (response.returnCode === 1) {
        const updatedData = response.data.map((item) => ({
          ...item,
          id: item.nodeId,
        }));
        const updatedLabels = response.columnDict.map((item) => ({
          ...item,
          width: 250,
          resizable: false,
          flex: 1,
          minWidth: 110,
        }));

        setAutomatData(updatedData);
        setAutomatTableLabels(updatedLabels);
      }
    };

    getData();
  }, []);

  const handleSelectRow = (selectedRowIds) => {
    if (selectedRowIds.length > 0) {
      // İlk seçili satırın ID'sini alın
      const selectedRowId = selectedRowIds[0];

      // Seçili satırın verilerini bulmak için ID'yi kullanın
      const selectedRowDatas = automatData.find((row) => row.id === selectedRowId);

      setSelectedRowId(selectedRowIds);
      setSelectedRowData(selectedRowDatas);
    } else {
      // Hiçbir satır seçilmediyse, seçili satırı sıfırlayın
      setSelectedRowId([]);
      setSelectedRowData(null);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };
  const handleAdd = async () => {
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const updateResponse = await AutomatService.addAutomat(formData);
    if (updateResponse.type == 'Failed') {
      errorToast(updateResponse.data);
      setIsAddModalOpen(false);
    } else {
      // handleFetchDoors();
      successToast(updateResponse.data);
      setIsAddModalOpen(false);
    }
    if (!updateResponse) return;
  };

  const handleDelete = async (e) => {
    const updateResponse = await AutomatService.deleteAutomat(selectedRowId);
    if (updateResponse.type == 'Failed') {
      errorToast(updateResponse.data);
      setIsUpdateModalOpen(false);
    } else {
      // handleFetchDoors();
      successToast(updateResponse.data);
      setIsUpdateModalOpen(false);
    }
    if (!updateResponse) return;
  };

  const customLabels = {
    nodeId: 'OtomatId',
    deviceId: 'Cihaz Seri No',
    nodeType: 'Otomat Tipi',
    name: 'Otomat Adı',
    city: 'Şehir',
    town: 'İlçe',
    address: 'Adres',
    latitude: 'Enlem',
    longitude: 'Boylam',
    group1: 'Group 1',
    group2: 'Group 2',
    nodeBrand: 'Otomat Marka',
    nodeModel: 'Otomat Model',
    description: 'Açıklama',
  };
  const addLabels = {
    nodeId: null,
    name: null,
    deviceId: null,
    city: null,
    town: null,
    latitude: null,
    longitude: null,
    address: null,
    group1: null,
    group2: null,
    nodeBrand: null,
    nodeModel: null,
    description: null,
  };

  return (
    <Page title="Otomat Tanımları">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <CardHeader
            title={'Otomat Tanımları'}
            subheader={''}
            sx={{ mb: 3 }}
            action={
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenAddModal}>
                  Ekle
                </Button>
                {selectedRowId.length != 0 && selectedRowId.length < 2 && (
                  <>
                    {console.log(selectedRowId)}
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
                      Sil
                    </Button>
                    <Button variant="outlined" onClick={handleOpenUpdateModal} startIcon={<UpdateIcon />}>
                      Güncelle
                    </Button>
                  </>
                )}
              </Box>
            }
          />

          <Box sx={{ height: 'auto', width: '100%' }}>
            {automatData && automatTableLabels && (
              <DataGrid
                sx={{
                  '& .MuiDataGrid-cellContent': {
                    whiteSpace: 'pre-line', // Hücre içeriğini kelimeyi bölmeyecek şekilde korur
                    overflow: 'hidden',
                    textOverflow: 'initial',
                    wordWrap: 'break-word',
                  },
                }}
                getRowHeight={() => 'auto'}
                getEstimatedRowHeight={() => 1000}
                autoHeight={true}
                rows={automatData}
                columns={automatTableLabels}
                rowsPerPageOptions={[5, 10, 25]}
                sortingOrder={['desc', 'asc']}
                initialState={{
                  ...automatData.initialState,
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
                checkboxSelection
                onSelectionModelChange={(selectedRowIds) => {
                  handleSelectRow(selectedRowIds);
                }}
              />
            )}
          </Box>
          <Divider />
        </Card>
        {selectedRowData && (
          <UpdateModal
            isOpen={isUpdateModalOpen}
            onClose={handleCloseUpdateModal}
            onAdd={handleUpdate}
            selectedRowData={selectedRowData}
            customLabels={customLabels}
          />
        )}
        {addLabels && (
          <AddModal
            isOpen={isAddModalOpen}
            onClose={handleCloseAddModal}
            onAdd={handleAdd}
            selectedRowData={addLabels}
            customLabels={customLabels}
          />
        )}
      </Container>
    </Page>
  );
}
