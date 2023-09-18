import { useTheme } from '@mui/material/styles';
import {
  Stack,
  TextField,
  Typography,
  Grid,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  sx,
  other,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// _mock_
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../_mock';
// components
import Page from '../../components/Page';
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  BookingReservationStats,
  SettingsSystem,
} from '../../sections/@dashboard/general/booking';
import useSwr from '../../hooks/useSwr';
// assets

import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';

// ----------------------------------------------------------------------

GeneralBooking.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
export default function GeneralBooking() {
  const { data } = useSwr(`api/SystemOptions/GetSystemOptions`);
  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="Sistem Ayarları">
      <Container>
        <Grid container spacing={3} maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant="h5" gutterBottom sx={{ marginLeft: '20px' }}>
            Sistem Ayarları
          </Typography>
        </Grid>
        {data && <SettingsSystem data={data} />}
      </Container>
    </Page>
  );
}
