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
import { Stack, Divider, Typography, Icon, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { successToast, errorToast } from '../../../../utils/toast';
import AddUser from './addUser';
import UserService from '../../../../services/UserService';
import UpdateUser from './updateUser';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: 'Kullanıcılar',
          utf8WithBom: true,
          delimiter: ';',
        }}
        printOptions={{
          fileName: 'Kullanıcılar',
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

export default function UserList({ data, listData, handleFetch }) {
  const [open, setOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState({});
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleClose = () => setOpen(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const response = await UserService.addUser(formData);
    if (response.type == 'Failed') {
      errorToast(response.data);
      setOpen(false);
    } else {
      handleFetch();
      successToast(response.data);
      setOpen(false);
    }
  };
  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const updateResponse = await UserService.updateUser(formData);
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
  const [userName, setUserName] = useState([]);
  const handleDelete = async (e, arrID) => {
    const response = await UserService.deleteUser(String(userName));
    if (response.type == 'Failed') {
      errorToast(response.data);
    } else {
      handleFetch();
      successToast(response.data);
    }
  };

  const { push } = useRouter();
  const theme = useTheme();

  const handleSelectRow = (id) => {
    setUserName(id);
    const item = data.data.find((item) => item.id === id[0]);
    if (!item) return;
    setCurrentItem(item);
  };

  return (
    <>
      <div style={{ height: 620, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="span" mb={2}>
              Kullanıcılar
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Stack
              flexDirection="row"
              sx={{ gap: 2, mb: 2 }}
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="flex-end"
            >
              <IconButton onClick={handleOpen} color="success" title="Kullanıcı Ekle">
                <AddIcon />
              </IconButton>
              {userName.length != 0 && (
                <>
                  <IconButton
                    onClick={handleDelete}
                    color="error"
                    title="Kullanıcı Sil"
                    disabled={userName.length > 1 || userName.length === 0}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleOpenUpdateModal}
                    color="success"
                    title="Kullanıcı Güncelle"
                    disabled={userName.length > 1 || userName.length === 0}
                  >
                    <UpdateIcon />
                  </IconButton>
                </>
              )}
            </Stack>
            <AddUser open={open} setOpen={setOpen} onSubmit={onSubmit} />
            {currentItem && (
              <UpdateUser
                open={openUpdateModal}
                setOpen={setOpenUpdateModal}
                onSubmit={onSubmitUpdate}
                currentItem={currentItem}
              />
            )}
          </Grid>
        </Grid>
        {data && data.type == 'Success' && (
          <DataGrid
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
            rows={data.data}
            columns={data.columnDict}
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
        )}
      </div>
    </>
  );
}
