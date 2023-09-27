import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  Typography,
  TableContainer,
  Link,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../../../components/table';
import Rating from '@mui/material/Rating';
import 'dayjs/locale/tr';
import TablePagination from '@mui/material/TablePagination';
// ----------------------------------------------------------------------

BankingRecentTransitions.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  tableData: PropTypes.object.isRequired,
  tableLabels: PropTypes.array.isRequired,
};

export default function BankingRecentTransitions({
  title,
  subheader,
  tableLabels,
  chartData,
  chartColor,
  tableData,
  ...other
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Sayfa başına gösterilecek satır sayısı

  // Sayfa değiştirildiğinde bu işlev çağrılır
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Sayfa başına gösterilecek satır sayısı değiştirildiğinde bu işlev çağrılır
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Sayfa değiştirildiğinde sayfayı sıfırla
  };

  // Sayfada gösterilecek veriyi hesapla
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = tableData?.slice(startIndex, endIndex);
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 500 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} orderBy="asc" />

            <TableBody>
              {displayedData?.map((row) => (
                <BankingRecentTransitionsRow key={row.nodeId} row={row} chartColor={chartColor} chartData={chartData} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData?.length} // Tüm veri sayısı
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

BankingRecentTransitionsRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    amount: PropTypes.number,
    avatar: PropTypes.string,
    category: PropTypes.number,
    date: PropTypes.number,
    message: PropTypes.number,
    status: PropTypes.string,
    type: PropTypes.string,
    cash: PropTypes.string,
    percent: PropTypes.number,
    stockColor: PropTypes.string,
    deviceName: PropTypes.string,
    location: PropTypes.string,
  }),
};

function BankingRecentTransitionsRow({ row, chartColor, chartData, tableData }) {
  const handleIconConnect = (value) => {
    switch (value) {
      case 0:
        return <Iconify icon={'el:ok'} width={16} height={16} color={'#2e7d32'} />;

      case 1:
        return <Iconify icon={'dashicons:no'} width={16} height={16} color={'#d32f2f'} />;
      default:
        return <Iconify icon={'pepicons-pop:line-x'} width={16} height={16} color={'#757575'} />;
    }
  };
  const theme = useTheme();
  return (
    <TableRow>
      <TableCell>
        <Link target="_blank" color="inherit" href={`/dashboard/automat/detail?id=${row.nodeId}`}>
          <Iconify icon="material-symbols:arrow-forward-ios-rounded" sx={{ mr: 0.5, width: 20, height: 20 }} />
        </Link>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            {renderAvatar(row.category, row.avatar)}
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

                justifyContent: 'center',
                ...(row.type === 'Income' && {
                  bgcolor: 'success.main',
                }),
              }}
            >
              {handleIconConnect(row.onlineStatus)}
            </Box>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {row.name}
            </Typography>
            <Typography variant="subtitle2"> {row.location}</Typography>
            <Rating name="read-only" value={row.rating} readOnly />
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2">{row.amount}</Typography>
        <Typography variant="subtitle2" noWrap={true}>
          {formatUnixTimestamp(row.date)}
        </Typography>
        <Typography variant="subtitle2">{row.cash == null ? 0 : `${row.cash} ₺`}</Typography>
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative' }}>{renderStausAlarm(row.alarm, row.avatar)}</Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative' }}>{`${row.temperature} °C`}</Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.percent)}</Box>
        </Box>
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s1}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s2}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s3}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s4}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s5}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s6}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s7}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s8}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s9}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s10}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s11}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s12}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s13}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s14}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s15}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${row.s16}%`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
}

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

function renderAvatar(category, avatar) {
  if (category === 1) {
    return <AvatarIcon icon={'iconoir:coffee-cup'} />;
  }
  if (category === 2) {
    return <AvatarIcon icon={'ep:cold-drink'} />;
  } else {
    return <AvatarIcon icon={'game-icons:vending-machine'} />;
  }
}

function renderStausAlarm(category) {
  if (category === 1) {
    return <AvatarIcon icon={'flat-color-icons:ok'} />;
  }
  if (category === 2) {
    return <AvatarIcon icon={'icon-park-twotone:error'} sx={{ color: '#54D62C' }} color={'#d62c2c'} />;
  } else {
    return <AvatarIcon icon={'ph:warning'} color="#ff9800" sx={{ color: '#FFCC00' }} />;
  }
}
function renderSlotStatus(percent) {
  if (percent <= 100 && percent >= 70) {
    return (
      <>
        <Box style={{ display: 'flex', alignItems: 'center', paddingRight: '19px' }}>
          <img
            src={`../../../assets/icons/automats/ic_full.png`}
            alt={`${percent}%`}
            style={{ maxWidth: '90px', maxHeight: '90px', marginRight: '8px' }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', marginLeft: '8px' }}>
            {`${percent}%`}
          </Typography>
        </Box>
      </>
    );
  }
  if (percent < 70 && percent >= 30) {
    return (
      <>
        <Box style={{ display: 'flex', alignItems: 'center', paddingRight: '19px' }}>
          <img
            src={`../../../assets/icons/automats/ic_notEmpty.png`}
            alt={`${percent}%`}
            style={{ maxWidth: '90px', maxHeight: '90px', marginRight: '8px' }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', marginLeft: '8px' }}>
            {`${percent}%`}
          </Typography>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box style={{ display: 'flex', alignItems: 'center', paddingRight: '19px' }}>
          <img
            src={`../../../assets/icons/automats/ic_empty.png`}
            alt={`${percent}%`}
            style={{ maxWidth: '90px', maxHeight: '90px', marginRight: '8px' }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', marginLeft: '8px' }}>
            {`${percent}%`}
          </Typography>
        </Box>
      </>
    );
  }
}
function formatUnixTimestamp(timestamp) {
  const months = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[monthIndex]} ${year}`;
}
