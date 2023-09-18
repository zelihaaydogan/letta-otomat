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
import { Stack, Divider, Typography, Icon, Grid, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

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
          fileName: 'Alarmlar',
          utf8WithBom: true,
          delimiter: ';',
        }}
        printOptions={{
          fileName: 'Alarmlar',
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

export default function Alarms({ data }) {
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
  data.columnDict.map((column) => {
    column.flex = 1;
  });
  const [lockID, setLockID] = useState({});
  const { push } = useRouter();
  const theme = useTheme();
  console.log(data);
  data.data.map((item) => {
    item.id = item.epoc;
  });
  return (
    <>
      <div style={{ height: 620, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Alarmlar
        </Typography>
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
