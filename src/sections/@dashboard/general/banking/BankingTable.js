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
  Table,
  Avatar,
  Button,
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
import { trTR } from '@mui/x-date-pickers/locales';
// ----------------------------------------------------------------------

BankingTable.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.object.isRequired,
  tableLabels: PropTypes.array.isRequired,
};

const getIcon = (name) => <img src={`/assets/icons/automats/${name}.png`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  full: getIcon('ic_full'),
  menuItem: getIcon('ic_inventory'),
  reports: getIcon('ic_report'),
  automat: getIcon('ic_automat'),
  automatDefinitions: getIcon('ic_automat'),
};
export default function BankingTable({ subheader, tableLabels, chartData, chartColor, tableData, ...other }) {
  return (
    <>
      {' '}
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} orderBy="asc" />

            <TableBody>
              {tableData?.map((row) => (
                <BankingTableRow key={row.nodeId} row={row} chartColor={chartColor} chartData={chartData} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          {/* View All */}
        </Button>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

BankingTableRow.propTypes = {
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

function BankingTableRow({ row, chartColor, chartData, tableData }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleDownload = () => {
    handleCloseMenu();
    console.log('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    handleCloseMenu();
    console.log('PRINT', row.nodeId);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log('SHARE', row.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('DELETE', row.id);
  };
  const handleDeleteClick = () => {
    // Burada tıklanan satırın IDsini alarak yeni sayfaya yönlendirebilirsiniz
    const selectedRowId = row.nodeId;
    console.log(selectedRowId);
    return; // Buradaki "id" kısmını tıkladığınız satırın ID'sine göre değiştirin
  };

  return (
    <TableRow>
      <TableCell>
        <Typography variant="subtitle2">{row.amount}</Typography>
        <Typography variant="subtitle2">{formatUnixTimestamp(row.date)}</Typography>
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative' }}>{renderStausAlarm(row.category, row.avatar)}</Box>
        </Box>
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s1)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s2)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s3)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s4)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s5)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s6)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s7)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s8)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s9)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s10)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s11)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s12)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s13)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s14)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s15)}</Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>{renderSlotStatus(row.s16)}</Box>
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
  // return avatar ? (
  //   <Avatar alt={category} src={avatar} sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }} />
  // ) : null;
}

function renderStausAlarm(category) {
  if (category === 1) {
    return <AvatarIcon icon={'flat-color-icons:ok'} />;
  }
  if (category === 2) {
    return <AvatarIcon icon={'icon-park-twotone:error'} sx={{ color: '#54D62C' }} color={'#d62c2c'} />;
  } else {
    return <AvatarIcon icon={'ph:warning'} color="#ff9800" />;
  }
  // return avatar ? (
  //   <Avatar alt={category} src={avatar} sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }} />
  // ) : null;
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
