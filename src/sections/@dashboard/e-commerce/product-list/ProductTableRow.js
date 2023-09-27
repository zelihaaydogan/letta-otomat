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
//

// ----------------------------------------------------------------------

ProductTableRow.propTypes = {
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
export default function ProductTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, cardNumber, cardValid }) {
  const theme = useTheme();

  const {
    automatName,
    salesMethod,
    createdAt,
    inventoryType,
    price,
    productBrand,
    balance,
    cardLastFourNo,
    cardName,
    productName,
  } = row;

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

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell>{automatName}</TableCell>
      <TableCell>{salesMethod}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{formatUnixTimestamp(row.epoch)}</TableCell>
      <TableCell sx={{ alignItems: 'center' }}>{productName}</TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{productBrand}</TableCell>

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
