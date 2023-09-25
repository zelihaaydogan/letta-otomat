import PropTypes from 'prop-types';
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack, LinearProgress } from '@mui/material';
import { fNumber, fPercent } from '../../../../utils/formatNumber';
import React, { useState, useEffect } from 'react';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

AppWidgetSales.propTypes = {
  chartColor: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  progressValue: PropTypes.number,
  progressColor: PropTypes.string,
  bgcolor: PropTypes.func,
  sx: PropTypes.object,
};

export default function AppWidgetSales({
  title,
  percent,
  total,
  chartColor,
  product,
  progressValue = 0,
  progressColor = 'success',
  bgcolor = 'green',
  sx,
  ...other
}) {
  const theme = useTheme();
  const [calculateProgressValue, setCalculateProgressValue] = useState(100);

  useEffect(() => {
    const calculatedTotal = 100 / total;
    setCalculateProgressValue(calculatedTotal);
  }, [total]);

  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `@${seriesName}`,
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography
            component="span"
            variant="subtitle2"
            bgcolor={bgcolor}
            borderRadius={'0.475rem'}
            padding={'0.5em'}
          >
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="flex-end">
          <Typography variant="button" display="block" gutterBottom>
            {product}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            {total}
          </Typography>
        </Stack>

        <LinearProgress variant="determinate" value={progressValue} color={progressColor} />
      </Box>
    </Card>
  );
}
