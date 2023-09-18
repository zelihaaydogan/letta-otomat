import React, { useState, useEffect } from 'react';
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
import { Stack, Divider, Button, Typography, Box, Grid } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useRouter } from 'next/router';
import KurulumModal from './KurulumModal';
import LockResetIcon from '@mui/icons-material/LockReset';
import GenerateCodeZero from '../../../../services/GenerateCodeZero';
import swal from 'sweetalert';
import GetOfflineDeviceList from '../../../../services/GetOfflineDeviceList';
import { errorToast, successToast, successToastKurulum } from '../../../../utils/toast';

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

export default function LockList({ data: { data, columnDict, initialState } }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [offlineDeviceList, setOfflineDeviceList] = useState(null);

  useEffect(() => {
    const getOfflineData = async () => {
      try {
        const response = await GetOfflineDeviceList.get();
        if (response.type === 'Success') {
          setOfflineDeviceList(response.data);
        } else {
          console.log('An error occurred while getting offline device list!');
        }
      } catch (error) {
        console.error('Error fetching offline device list:', error);
      }
    };
    getOfflineData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formData = {};
    for (const [key, value] of form.entries()) {
      formData[key] = value;
    }
    try {
      const response = await GenerateCodeZero.generate(formData.deviceSeriNo, formData.aCode);
      if (response.resultStatus === 0) {
        errorToast(response.data);
      } else {
        successToastKurulum(`Kurulum Sıfırlama Kodu: ${response.data}`, {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'light',
          CopyToClipboard: true,
          Text: `Kurulum Sıfırlama Kodu:${response.data}`,
        });
      }
      setOpen(false);
    } catch (error) {
      console.error('An error occurred during form submission:', error);
      // Handle error, show error message, etc.
    }
  };

  const { push } = useRouter();
  const theme = useTheme();

  const rows = data.map((item) => ({ ...item, id: item.deviceSerial }));

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="span" mb={2}>
              Kilitler
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
                startIcon={<LockResetIcon />}
                color="secondary"
                onClick={handleOpen}
                disabled={false}
              >
                Kurulum Sıfırlama
              </Button>
            </Stack>
            <KurulumModal open={open} setOpen={setOpen} onSubmit={onSubmit} />
          </Grid>
        </Grid>
        <Box sx={{ height: 400, width: 'auto' }}>
          <DataGrid
            getRowHeight={() => 'auto'}
            getEstimatedRowHeight={() => 600}
            style={{ visuallyHidden }}
            className="heightAuto visuallyHidden"
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columnDict}
            autoHeight={true}
            rowsPerPageOptions={[5, 10, 25]}
            sortingOrder={['desc', 'asc']}
            initialState={{
              ...initialState,
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
            disableSelectionOnClick
            components={{ Toolbar: CustomToolbar }}
          />
        </Box>
      </div>
    </>
  );
}
