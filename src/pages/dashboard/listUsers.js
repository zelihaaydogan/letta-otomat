// @mui
import { Card, Button, Container, DialogTitle } from '@mui/material';
// redux
// hooks
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Divider, CardHeader } from '@mui/material';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { GridToolbar } from '@mui/x-data-grid';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import AddModal from '../../sections/@dashboard/general/userList/AddModal';
import UpdateModal from '../../sections/@dashboard/general/userList/UpdateModal';
import { successToast, errorToast } from '../../utils/toast';

// ----------------------------------------------------------------------

ListUsers.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
export default function ListUsers() {
  const { themeStretch } = useSettings();
  const [automatData, setAutomatData] = useState();
  const [automatTableLabels, setAutomatTableLabels] = useState();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState([]);
  const [formData, setFormData] = useState();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async (e) => {
    console.log('deneme');

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    const updateResponse = await UserService.updateUser(formData);
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

  useEffect(() => {
    const getData = async () => {
      const response = await UserService.getUser();
      if (response.returnCode === 1) {
        const updatedData = response.data.map((item) => ({
          ...item,
        }));
        setAutomatData(response.data);
        const updatedLabels = response.columnDict
          .filter((item) => item.field !== 'id')
          .map((item) => ({
            ...item,

            resizable: false,
            flex: 1,
            minWidth: 220,
          }));

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
    console.log('deneme');

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    const updateResponse = await UserService.addUser(formData);
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
    const updateResponse = await UserService.deleteUser(selectedRowId);
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
    webUserMail: 'Mail',
    name: 'Ad Soyad',
    password: 'Şifre',
    role: 'Rol',
    groupId: 'Grup No',

    // Diğer özel etiketler burada tanımlanabilir
  };
  const addLabels = {
    webUserMail: 'Mail',
    name: 'Ad Soyad',
    password: 'Şifre',
    role: 'Rol',
    groupId: 'Grup No',
  };

  return (
    <Page title="Kullanıcılar">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <CardHeader
            title={'Kullanıcılar'}
            subheader={''}
            sx={{ mb: 3 }}
            action={
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenAddModal}>
                  Ekle
                </Button>
                {selectedRowId.length != 0 && selectedRowId.length < 2 && (
                  <>
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
                autoHeight={true}
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
            onUpdate={handleUpdate}
            selectedRowData={selectedRowData}
            customLabels={customLabels}
          />
        )}
        {addLabels && (
          <AddModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onAdd={handleAdd} addLabels={addLabels} />
        )}
      </Container>
    </Page>
  );
}
