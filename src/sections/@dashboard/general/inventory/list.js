import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  trTR,
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { Stack, Divider, Button, Typography, Icon, Grid, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { successToast, errorToast } from '../../../../utils/toast';
import AddModal from './addmodal';
import UpdateModal from './updateModal';
import InventoryService from '../../../../services/InventoryService';
import AddStateModal from './addStateModal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteStateModal from './deleteStateModal';
import { lightGreen, red, grey } from '@mui/material/colors';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: 'Cihazlar',
          utf8WithBom: true,
          delimiter: ';',
        }}
        printOptions={{
          fileName: 'Cihazlar',
          hideFooter: true,
          hideToolbar: true,
          allColumns: true,
        }}
      />
    </GridToolbarContainer>
  );
}
function WrappedIcon(props) {
  return <Icon {...props} />;
}
WrappedIcon.muiName = 'Icon';

export default function List({ data, listData, handleFetch, statusList }) {
  //-----------------------Add Modal-----------------------------------------------
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const addStatusResponse = await InventoryService.addDevice(formData);
    if (addStatusResponse.type == 'Failed') {
      errorToast(addStatusResponse.data);
      setOpen(false);
    } else {
      handleFetch();
      successToast(addStatusResponse.data);
      setOpen(false);
    }
  };

  //-----------------------Update Modal-----------------------------------------------
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const updateResponse = await InventoryService.updateDevice(formData);
    if (updateResponse.type == 'Failed') {
      errorToast(updateResponse.data);
      setOpenUpdateModal(false);
    } else {
      handleFetch();
      successToast(updateResponse.data);
      setOpenUpdateModal(false);
    }
    if (!updateResponse) return;
  };
  //-----------------------Delete Modal-----------------------------------------------
  const [currentItem, setCurrentItem] = React.useState({});
  const [deviceSerial, setDeviceSerial] = useState([]);
  const handleSelectRow = (id) => {
    setDeviceSerial(id);
    const item = data.data.find((item) => item.id === id[0]);
    setCurrentItem(item);
    if (!item) return;
  };

  const handleDelete = async () => {
    const response = await InventoryService.deleteDevice(String(deviceSerial));
    if (response.type == 'Failed') {
      errorToast(response.data);
    } else {
      handleFetch();
      successToast(response.data);
    }
  };

  const { push } = useRouter();
  const theme = useTheme();
  //-----------------------Add Status Modal-----------------------------------------------
  const [openAddStatus, setOpenAddStatus] = React.useState(false);
  const handleOpenAddStatus = () => setOpenAddStatus(true);
  const handleCloseAddStatus = () => setOpenAddStatus(false);
  const onSubmitAddStatus = async (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const addStatusResponse = await InventoryService.addStatusDevice(formData.addStatus);
    if (addStatusResponse.type == 'Failed') {
      errorToast(addStatusResponse.data);
      setOpenAddStatus(false);
    } else {
      successToast(addStatusResponse.data);
      setOpenAddStatus(false);
      handleFetch();
    }
  };

  //-----------------------Update Status Modal-----------------------------------------------
  const [openDeleteStatus, setOpenDeleteStatus] = React.useState(false);
  const handleOpenDeleteStatus = () => setOpenDeleteStatus(true);
  const handleCloseDeleteStatus = () => setOpenDeleteStatus(false);
  const onSubmitDeleteStatus = async (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const deleteStatusResponse = await InventoryService.deleteStatusDevice(formData.deleteStatus);
    if (deleteStatusResponse.type == 'Failed') {
      errorToast(deleteStatusResponse.data);
      setOpenDeleteStatus(false);
    } else {
      handleFetch();
      successToast(deleteStatusResponse.data);
      setOpenDeleteStatus(false);
    }
  };
  return (
    <>
      <div style={{ height: 620, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="span" mb={2}>
              Cihazlar
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Stack
              flexDirection="row"
              sx={{ gap: 2, mb: 2 }}
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleOpenAddStatus}
                startIcon={<AddIcon />}
                sx={{ borderRadius: '80px' }}
              >
                Durum Ekle
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                onClick={handleOpenDeleteStatus}
                startIcon={<DeleteIcon />}
                sx={{ borderRadius: '80px' }}
                handleFetch={handleFetch}
              >
                Durum Sil
              </Button>

              <IconButton onClick={handleOpen} color="success" title="Cihaz Ekle">
                <AddIcon />
              </IconButton>

              {deviceSerial.length != 0 && (
                <>
                  <IconButton
                    onClick={handleDelete}
                    color="error"
                    title="Cihaz Sil"
                    disabled={deviceSerial.length > 1 || deviceSerial.length === 0}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleOpenUpdateModal}
                    color="success"
                    title="Cihaz Güncelle"
                    disabled={deviceSerial.length > 1 || deviceSerial.length === 0}
                  >
                    <UpdateIcon />
                  </IconButton>
                </>
              )}
            </Stack>
            <AddModal open={open} setOpen={setOpen} onSubmit={onSubmit} statusList={statusList} />
            <AddStateModal
              open={openAddStatus}
              setOpen={setOpenAddStatus}
              onSubmit={onSubmitAddStatus}
              currentItem={currentItem}
            />
            {statusList && (
              <>
                <DeleteStateModal
                  open={openDeleteStatus}
                  setOpen={setOpenDeleteStatus}
                  onSubmit={onSubmitDeleteStatus}
                  statusList={statusList}
                />
                {currentItem && (
                  <UpdateModal
                    open={openUpdateModal}
                    setOpen={setOpenUpdateModal}
                    onSubmit={onSubmitUpdate}
                    currentItem={currentItem}
                    statusList={statusList}
                  />
                )}
              </>
            )}
          </Grid>
        </Grid>
        {data && data.type == 'Success' && (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              getRowHeight={() => 'auto'}
              getEstimatedRowHeight={() => 400}
              localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
              rows={data.data}
              columns={data.columnDict}
              getRowId={(row) => row.deviceSerial}
              rowsPerPageOptions={[5, 10, 25]}
              sortingOrder={['desc', 'asc']}
              initialState={{
                ...data.initialState,
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
              components={{ Toolbar: CustomToolbar }}
              checkboxSelection
              disableSelectionOnClick
              autoHeight={true}
              onSelectionModelChange={(data) => {
                handleSelectRow(data);
              }}
            />
          </Box>
        )}
      </div>
    </>
  );
}
