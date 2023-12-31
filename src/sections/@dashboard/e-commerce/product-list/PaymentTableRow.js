import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, Stack, IconButton } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import {
  BankingContacts,
  BankingWidgetSummary,
  BankingInviteFriends,
  BankingQuickTransfer,
  BankingCurrentBalance,
  BankingBalanceStatistics,
  BankingRecentTransitions,
  BankingExpensesCategories,
} from '../../../../sections/@dashboard/general/banking';
import { _bankingContacts, _bankingCreditCard, _bankingRecentTransitions } from '../../../../_mock';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
//

// ----------------------------------------------------------------------

PaymentTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};
const HEIGHT = 166;
const CardItemStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT - 16,
  backgroundSize: 'cover',
  padding: theme.spacing(1),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.white,
  backgroundImage: 'url("/assets/bg_card.png")',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '10px',
}));
export default function PaymentTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, cardNumber, cardValid }) {
  const theme = useTheme();

  const { bankName, status, createdAt, inventoryType, price, productBrand, cardType, cardLastFourNo, cardName, epoch } =
    row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const [showCurrency, setShowCurrency] = useState(true);

  const onToggleShowCurrency = () => {
    setShowCurrency((prev) => !prev);
  };
  const handleCardType = (value) => {
    switch (value) {
      case 0:
        return <Iconify icon={'logos:visa'} width={40} height={40} />;
      case 1:
        return <Iconify icon={'logos:mastercard'} width={40} height={40} />;
      case 2:
        return <Iconify icon={'fontisto:troy'} width={40} height={40} />;

      default:
        return <Iconify icon={'bytesize:creditcard'} width={40} height={40} />;
    }
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell>{bankName}</TableCell>
      <TableCell>{handleCardType(cardType)}</TableCell>

      <TableCell>{renderStatus(status)}</TableCell>
      <TableCell>{`${price} ₺`}</TableCell>
      <TableCell>{formatUnixTimestamp(epoch)}</TableCell>
      <TableCell>
        <Typography variant="subtitle1" gutterBottom>{`********${cardLastFourNo}`}</Typography>
      </TableCell>

      <TableCell sx={{ alignItems: 'center' }}>{cardName}</TableCell>

      {/* <TableCell>{fDate(createdAt)}</TableCell> */}
      {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}></TableCell> */}

      {/* <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (inventoryType === 'out_of_stock' && 'error') || (inventoryType === 'low_stock' && 'warning') || 'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {inventoryType ? sentenceCase(inventoryType) : ''}
        </Label>
      </TableCell> */}

      {/* <TableCell align="right">{fCurrency(price)}</TableCell> */}
    </TableRow>
  );
}
function renderStatus(status) {
  if (status === 1) {
    return (
      <Stack direction="row" spacing={1}>
        <Chip label="Başarılı" color="success" />
      </Stack>
    );
  }
  if (status === 2) {
    return (
      <Stack direction="row" spacing={1}>
        <Chip label="Başarısız" color="error" />
      </Stack>
    );
  } else {
    return (
      <Stack direction="row" spacing={1}>
        <Chip label="Başarılı" color="success" />
      </Stack>
    );
  }
  // return avatar ? (
  //   <Avatar alt={category} src={avatar} sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }} />
  // ) : null;
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
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day} ${months[monthIndex]} ${year} ${hours}:${minutes}:${seconds}`;
}
