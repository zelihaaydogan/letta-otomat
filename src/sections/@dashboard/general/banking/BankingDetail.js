import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Container,
  Grid,
  Avatar,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  Chip,
  Typography,
  TableContainer,
  Link,
  CardContent,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../../../components/table';
import Rating from '@mui/material/Rating';
import 'dayjs/locale/tr';
import IconButton from '@mui/material/IconButton';
import ReactApexChart from '../../../../components/chart';
import { fNumber, fPercent } from '../../../../utils/formatNumber';
import SvgIconStyle from '../../../../components/SvgIconStyle';
import { Margin } from '@mui/icons-material';
import useSettings from '../../../../hooks/useSettings';
import { column } from 'stylis';
import PaymentsIcon from '@mui/icons-material/Payments';
// ----------------------------------------------------------------------

BankingDetail.propTypes = {
  category: PropTypes.number,
  name: PropTypes.string,
  location: PropTypes.string.isRequired,
  rating: PropTypes.number,
  data: PropTypes.object,
};

export default function BankingDetail({ category, name, data, rating }) {
  console.log(data);
  const { themeStretch } = useSettings();
  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Grid container spacing={2}>
        {data && (
          <Grid key={`widget-${name}`} item xs={12} md={12}>
            <Card spacing={3}>
              <CardContent>
                <Grid container direction="row" spacing={3} justifyContent="space-between" alignItems="stretch">
                  <Grid item xs={4} sm={4} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ position: 'relative' }}>
                        {category ? renderAvatar(category) : '--'}
                        <Box
                          sx={{
                            right: 0,
                            bottom: 0,
                            width: 18,
                            height: 18,
                            display: 'flex',
                            borderRadius: '50%',
                            position: 'absolute',
                            alignItems: 'center',
                            color: 'common.white',
                            bgcolor: 'error.main',
                            justifyContent: 'center',
                            ...(category === 'Income' && {
                              bgcolor: 'success.main',
                            }),
                          }}
                        >
                          <Iconify
                            icon={
                              category.type === 'Income'
                                ? 'pepicons-pencil:line-y-off'
                                : 'fluent-mdl2:status-circle-error-x'
                            }
                            width={16}
                            height={16}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                          {name ? name : '--'}
                        </Typography>
                        <Typography variant="body2">{`${data.town} / ${data.city}`}</Typography>
                        <Rating name="read-only" value={rating ? rating : '--'} readOnly />
                        <Typography variant="body2">{`${data.nodeBrand} ${data.nodeModel}`}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={8} sm={4} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box sx={{ alignItems: 'baseline', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        {data.percent ? renderCash(data.percent) : '--'}{' '}
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mt: 2 }}>
                          {`Biriken Nakit: ${data.cash} ₺`}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
AvatarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
};

function AvatarIcon({ icon, color }) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Iconify icon={icon} width={24} height={24} color={color} />
    </Avatar>
  );
}
function renderAvatar(category, avatar) {
  if (category === 1) {
    return <AvatarIcon icon={'iconoir:coffee-cup'} />;
  }
  if (category === 2) {
    return <AvatarIcon icon={'ep:cold-drink'} />;
  } else {
    return <AvatarIcon icon={'game-icons:vending-machine'} />;
  }
  // return avatar ? (
  //   <Avatar alt={category} src={avatar} sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }} />
  // ) : null;
}
function renderCash(cash) {
  return <Chip variant="outlined" label={`Stok Seviyesi: ${cash} %`} color="primary" />;
}
