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
  Button,
  Typography,
  Icon,
  Grid,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  ButtonBase,
  Container,
  Img,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import UpdateIcon from '@mui/icons-material/Update';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { useState } from 'react';
import { successToast, errorToast } from '../../../../utils/toast';
import AddModal from './AddModal';
import doorService from '../../../../services/DoorService';
import UpdateModal from './UpdateModal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ImportModal from './ImportModal';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PropTypes from 'prop-types';
// _mock_
import { _invoices } from '../../../../_mock';
// hooks
import DeviceDetails from '../../../../services/DeviceDetails';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import LockIcon from '@mui/icons-material/Lock';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import AnalyticsWidgetSummaryCustom from '../../../../sections/@dashboard/general/analytics/AnalyticsWidgetSummaryCustom';
import RectangleIcon from '@mui/icons-material/Rectangle';
import DeviceLogs from '../../../../services/DeviceLogs';
import { visuallyHidden } from '@mui/utils';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: 'Otomatlar',
          utf8WithBom: true,
          delimiter: ';',
        }}
        printOptions={{
          fileName: 'Otomatlar',
          hideFooter: true,
          hideToolbar: true,
          allColumns: true,
        }}
      />
    </GridToolbarContainer>
  );
}
function CustomToolbarLog() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: 'Loglar',
          utf8WithBom: true,
          delimiter: ';',
        }}
        printOptions={{
          fileName: 'Loglar',
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

//--------Detail-------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const DeviceStatus = {
  DoorStat: 'Kapı Durumu',
  BatteryLevel: 'Pil Seviyesi',
  LockStat: 'Kilit Durumu',
  NetboxStat: 'Netbox Durumu',
};

export default function DoorList({ data, listData, handleFetchDoors }) {
  const [open, setOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState({});
  const [openImport, setOpenImport] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleClose = () => setOpen(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  const [value, setValue] = React.useState(0);
  const [inlineTab, setInlineTab] = React.useState('pano');

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const response = await doorService.addDoor(formData);
    if (response.type == 'Failed') {
      errorToast(response.data);
      setOpen(false);
    } else {
      handleFetchDoors();
      successToast(response.data);
      setOpen(false);
    }
  };
  const resetFw = async () => {
    const response = await doorService.setOperationType();
    if (!response) return;
    if (response.type === 'Success') {
      successToast(response.data);
    } else {
      errorToast(response.data);
    }
  };
  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const updateResponse = await doorService.updateDoor(formData);
    if (updateResponse.type == 'Failed') {
      errorToast(updateResponse.data);
      setOpenUpdateModal(false);
    } else {
      handleFetchDoors();
      successToast(updateResponse.data);
      setOpenUpdateModal(false);
    }
    if (!updateResponse) return;
  };
  const [deviceIP, setDeviceIP] = useState([]);
  const handleDelete = async (e, arrID) => {
    const response = await doorService.deleteDoor(String(deviceIP));
    if (response.type == 'Failed') {
      errorToast(response.data);
    } else {
      handleFetchDoors();
      successToast(response.data);
    }
  };

  const { push } = useRouter();
  // const handleEdit = async (e, id) => {
  //   e.stopPropagation();
  //   const response = await DeviceDetails.get(id);
  //   if (response.type === 'Success') {
  //     setDetails(response.data);
  //   } else if (response.type === 'Failed') {
  //     errorToast(response.data);
  //     return;
  //   }
  //   const logs = await DeviceLogs.get(response.data.doorId);
  //   if (logs.type === 'Success') {
  //     logs.columnDict.map((item) => {
  //       item.width = 350;
  //       item.flex = 2;
  //       setDeviceLogs(logs);
  //     });
  //   } else if (logs.type === 'Failed') {
  //     errorToast(response.data);
  //   }
  //   setValue(1);
  // };
  const theme = useTheme();

  const handleSelectRow = (id) => {
    setDeviceIP(id);
    const item = data.data.find((item) => item.id === id[0]);
    if (!item) return;
    setCurrentItem(item);
  };
  var columns = [
    // {
    //   sortable: false,
    //   filterable: false,
    //   hideable: false,
    //   menubar: false,
    //   width: 60,
    //   minWidth: 60,
    //   maxWidth: 200,
    //   disableExport: true,
    //   renderCell: (params) => (
    //     <strong>
    //       {params.deviceSerial}
    //       <IconButton aria-label="detail" tabIndex={params.hasFocus ? 0 : -1} onClick={(e) => handleEdit(e, params.id)}>
    //         <ArrowForwardIosIcon color="action" />
    //       </IconButton>
    //     </strong>
    //   ),
    // },
    { field: 'doorID', headerName: 'Kapı Kodu', disableColumnResize: true, minWidth: 160, flex: 2 },
    { field: 'name', headerName: 'Şube Adı', disableColumnResize: true, minWidth: 160, flex: 2 },
    { field: 'deviceSeriNo', headerName: 'Kilit SeriNo', disableColumnResize: true, minWidth: 120, flex: 2 },
    { field: 'deviceIp', headerName: 'Kilit IP', disableColumnResize: true, minWidth: 160, flex: 2 },
    { field: 'region', headerName: 'Bölge', disableColumnResize: true, minWidth: 120, flex: 2 },
    { field: 'group', headerName: 'Grup', disableColumnResize: true, minWidth: 120, flex: 2 },
    { field: 'operationType', headerName: 'İşlem Tipi', disableColumnResize: true, minWidth: 160, flex: 2 },
    { field: 'softwareVersion', headerName: 'Yazılım Versiyon', disableColumnResize: true, minWidth: 120, flex: 2 },
  ];
  //------------------detail------------------

  const { query } = useRouter();

  const { id } = query;

  const [details, setDetails] = useState(null);

  const [deviceLogs, setDeviceLogs] = useState(null);
  const handleColor = (color) => {
    switch (color) {
      case 'Çevrimiçi':
        return 'success';
      case 'Çevrimdışı':
        return 'error';
      default:
        return 'warning';
    }
  };
  const handleIcon = (icon) => {
    switch (icon) {
      case 'LockStat':
        return <LockIcon />;
      case 'DoorStat':
        return <DoorFrontIcon />;
      case 'BatteryLevel':
        return <BatteryStdIcon />;
      default:
        return <RectangleIcon />;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInlineChange = (event, newValue) => {
    setInlineTab(newValue);
  };

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Otomatlar" {...a11yProps(0)} />
            <Tab label="Otomat Detayları" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="span" mb={2}>
                <></>
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Stack
                flexDirection="row"
                sx={{ gap: 2, mb: 2 }}
                divider={<Divider orientation="vertical" flexItem />}
                justifyContent="flex-end"
              >
                <Button onClick={() => resetFw()} variant="outlined" startIcon={<UpdateIcon />} color="inherit">
                  Güncellemeleri Kapat
                </Button>
                <Button
                  onClick={() => setOpenImport(true)}
                  variant="outlined"
                  startIcon={<ImportExportIcon />}
                  color="inherit"
                >
                  Kapı Import
                </Button>
                <IconButton onClick={handleOpen} color="success" title="Kapı Ekle">
                  <AddIcon />
                </IconButton>

                {deviceIP.length != 0 && (
                  <>
                    <IconButton
                      onClick={handleDelete}
                      color="error"
                      title="Kapı Sil"
                      disabled={deviceIP.length > 1 || deviceIP.length === 0}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleOpenUpdateModal}
                      color="success"
                      title="Kapı Güncelle"
                      disabled={deviceIP.length > 1 || deviceIP.length === 0}
                    >
                      <UpdateIcon />
                    </IconButton>
                  </>
                )}
              </Stack>
              {listData && (
                <AddModal
                  open={open}
                  setOpen={setOpen}
                  onSubmit={onSubmit}
                  listData={listData}
                  currentItem={currentItem}
                />
              )}

              {currentItem && listData && (
                <UpdateModal
                  openUpdateModal={openUpdateModal}
                  setOpenUpdateModal={setOpenUpdateModal}
                  onSubmitUpdate={onSubmitUpdate}
                  currentItem={currentItem}
                  listData={listData}
                  data={data}
                />
              )}
            </Grid>
          </Grid>
          {data && data.type == 'Success' && (
            <DataGrid
              localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
              rows={data.data}
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
              checkboxSelection
              disableSelectionOnClick
              autoHeight={true}
              onSelectionModelChange={(data) => {
                handleSelectRow(data);
              }}
              height="auto"
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card>
            <CardContent>
              <Box>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 'auto', height: 'auto' }}>
                      <Button variant="contained" size="large" color={handleColor(details?.status || '')}>
                        {details ? (details.status ? details.status : '--') : '--'}
                      </Button>
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="span">
                          {`Kapı Kodu: ${details?.doorId || '--'}`}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {`Şube Adı: ${details?.description || '--'}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`Bölge: ${details?.region || '--'}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Card>
                  <CardContent>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                          value={inlineTab}
                          onChange={handleInlineChange}
                          textColor="secondary"
                          indicatorColor="secondary"
                          aria-label="secondary tabs example"
                        >
                          <Tab value="pano" label="Özet Ekranı" {...a11yProps(2)} />
                          <Tab value="loglar" label="Loglar" {...a11yProps(3)} />
                        </Tabs>
                      </Box>
                      <br />
                      {inlineTab === 'pano' && (
                        <Box>
                          <Grid container spacing={3}>
                            {details?.widgets.map((item) => (
                              <Grid key={item.key} item xs={12} sm={6} md={3}>
                                <AnalyticsWidgetSummaryCustom
                                  title={DeviceStatus[item.key]}
                                  total={item.value || '--'}
                                  color={item.color}
                                  icon={handleIcon(item?.key) || ''}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      )}
                      {inlineTab === 'loglar' && (
                        <Box sx={{ height: '400', width: '100%' }}>
                          {deviceLogs && (
                            <DataGrid
                              getRowHeight={() => 'auto'}
                              style={{ visuallyHidden }}
                              className="heightAuto visuallyHidden "
                              localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                              rows={deviceLogs.data}
                              columns={deviceLogs.columnDict}
                              autoHeight={true}
                              pageSize={5}
                              rowsPerPageOptions={[5, 10, 25]}
                              components={{ Toolbar: CustomToolbarLog }}
                              disableSelectionOnClick
                              sortingOrder={['desc', 'asc']}
                              initialState={{
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
                            />
                          )}
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      </div>
      <ImportModal open={openImport} setOpen={setOpenImport} handleFetchDoors={handleFetchDoors} />
    </>
  );
}
