import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  Grid,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../../components/table';
// sections
import { ProductTableRow, ProductTableToolbar } from '../../../sections/@dashboard/e-commerce/product-list';
import SalesService from '../../../services/SalesService';
import { Divider, CardHeader } from '@mui/material';
import { BankingWidgetSummary } from '../../../sections/@dashboard/general/banking';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Otomat Adı', label: 'Otomat Adı', align: 'left' },
  { id: 'salesMethod', label: 'Ödeme Yöntemi', align: 'left' },
  { id: 'price', label: 'Ücret', align: 'left' },
  { id: 'productName', label: 'Ürün Adı', align: 'left', width: 180 },
  { id: 'productBrand', label: 'Ürünün Markası', align: 'left', width: 180 },

  // { id: '' },
];

// ----------------------------------------------------------------------

SalesReport.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function SalesReport() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
  });

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.product);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SalesService.getSalesReport();
        if (response.returnCode === 1) {
          const enumList = response.columnDict.find((item) => item.field === 'salesMethod').enumList.split(',');

          const updatedData = response.data.map((item) => {
            // Satış yöntemini enumList'e göre güncelle
            if (enumList[item.salesMethod]) {
              if (enumList[item.salesMethod] === 'Cashless') {
                item.salesMethod = 'Kart';
              } else {
                item.salesMethod = 'Nakit';
              }
            }
            return item;
          });
          setTableData(updatedData);
        } else {
          console.error('Veri alınamadı.');
        }
      } catch (error) {
        console.error('Veri çekerken bir hata oluştu:', error);
      }
    };

    fetchData();
  }, []);

  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SalesService.getSalesSummary();
        if (response.returnCode === 1) {
          setSummary(response.data);
        } else {
          console.error('Veri alınamadı.');
        }
      } catch (error) {
        console.error('Veri çekerken bir hata oluştu:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.eCommerce.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);
  const handleBgColor = (value) => {
    switch (value) {
      case 'success':
        return '#54D62C';
      case 'error':
        return '#FF4842';
      default:
        return '#FFC107';
    }
  };

  return (
    <Page title="Raporlar: Satış Raporları">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container spacing={3}>
          {summary?.map((item, i) => (
            <Grid key={`widget-${i}`} item xs={12} md={6}>
              <BankingWidgetSummary
                title={item.key === 'Cash' ? 'Nakit' : 'Kart'}
                color="warning"
                icon={'eva:diagonal-arrow-right-up-fill'}
                percent={-0.5}
                total={item.value}
                chartData={item.graphList}
              />
            </Grid>
          ))}
        </Grid>

        <Card sx={{ mt: 3 }}>
          <CardHeader title={'Satış Raporları'} subheader={''} sx={{ mb: 3 }} />
          <ProductTableToolbar filterName={filterName} onFilterName={handleFilterName} sx={{ width: '100px' }} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  // actions={
                  //   // <Tooltip title="Delete">
                  //   //   <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                  //   //     <Iconify icon={'eva:trash-2-outline'} />
                  //   //   </IconButton>
                  //   // </Tooltip>
                  // }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <ProductTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.name)}
                        />
                      ) : (
                        !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                      )
                    )}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Yoğunluk"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    const filterText = filterName.toLowerCase();
    tableData = tableData.filter((item) => {
      // Bu döngü, her bir öğenin her bir kolonunu kontrol eder
      for (const key in item) {
        if (Object.hasOwnProperty.call(item, key)) {
          // Kolon değerini küçük harf yaparak ve arama terimiyle karşılaştırarak arama yapar
          const columnValue = item[key].toString().toLowerCase();
          if (columnValue.indexOf(filterText) !== -1) {
            return true; // Eşleşme bulundu, öğeyi sakla
          }
        }
      }
      return false; // Eşleşme bulunamadı, öğeyi filtrele
    });
  }

  return tableData;
}
