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
import {
  Stack,
  Divider,
  Modal,
  Box,
  Button,
  Card,
  TextField,
  TableSortLabel,
  Toolbar,
  Typography,
  Icon,
  Grid,
  CardContent,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useRouter } from 'next/router';
import { alpha } from '@mui/material/styles';
import UpdateIcon from '@mui/icons-material/Update';
// import ImportExportIcon from '@mui/icons-material/ImportExport';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect } from 'react';
import { append } from 'stylis';
import { successToast, errorToast } from '../../../../utils/toast';
import KurulumModal from './KurulumModal';
import LockResetIcon from '@mui/icons-material/LockReset';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  borderRadius: '12px',
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: 'Kilitler',
          utf8WithBom: true,
          delimiter: ';',
        }}
        printOptions={{
          fileName: 'Kilitler',
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

export default function LockListDashboard({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openKurulum, setOpenKurulum] = React.useState(false);
  const handleOpenKurulum = () => setOpenKurulum(true);
  const handleCloseKurulum = () => setOpenKurulum(false);

  const [form, setForm] = useState({ operationType: '', softwareVersion: '' });
  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  var columns = [
    { field: 'epoc', headerName: 'Tarih-Saat', disableColumnResize: true, minWidth: 90, flex: 1 },
    { field: 'type', headerName: 'Alarm Türü', disableColumnResize: true, minWidth: 90, flex: 1 },
    { field: 'deviceSerial', headerName: 'Seri No', disableColumnResize: true, minWidth: 90, flex: 1 },
    { field: 'doorId', headerName: 'Otomat Kodu', disableColumnResize: true, minWidth: 90, flex: 1 },
  ];

  const onSubmit = async (e) => {
    // const response = await AddDoor.postData(form);
    // if (response.type == 'Failed') {
    //   errorToast(response.data);
    // } else successToast(response.data);
    // console.log(doorID);
    successToast('Yapım Aşamasında...');
  };

  const onSubmitKurulum = async (e) => {
    // TODO: Submit kurulum
    console.log('Kurulum modal submit edildi');
    successToast('Yapım Aşamasında...');
  };

  const [lockID, setLockID] = useState({});
  // const handleDelete = async (e, arrID) => {
  //   const response = await DeleteDoor.postData(String(doorID));
  //   console.log(response);
  //   if (response.type == 'Failed') {
  //     errorToast(response.data);
  //   } else successToast(response.data);
  //   console.log(doorID);
  // };
  const { push } = useRouter();
  const handleEdit = (e, id) => {
    e.stopPropagation();
    push(PATH_DASHBOARD.invoice.edit(id));
  };
  const theme = useTheme();

  data?.data.map((item) => {
    item.id = item.deviceSerial;
  });
  return (
    <>
      <div style={{ width: '100%' }}>
        <DataGrid
          localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
          rows={data?.data}
          columns={columns}
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
          disableSelectionOnClick
          autoHeight={true}
          onSelectionModelChange={(data) => {
            setLockID(data);
          }}
        />
      </div>
    </>
  );
}
