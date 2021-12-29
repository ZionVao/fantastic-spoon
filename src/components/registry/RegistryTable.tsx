import * as React from 'react';
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';
import PaginationSearch from './PaginationSearchRegistry';
import { useTypedDispatch, useTypedSelector } from 'src/store';
import { RegistryFilter } from 'src/interfaces/Filters';
import { fetchRegistryData } from 'src/store/registry/actions';
import { loadRegistry } from 'src/store/registry/slice';
import { DocType } from 'src/common/enums/app/doc-type.enum';
import { DocRecord } from 'src/interfaces/services/models/Record';

interface Column {
  id: 'number' | 'name' | 'code' | 'date' | 'type';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => any;
}

const columns: Column[] = [
  { id: 'number', label: '#', format: (value: number) => value.toString() },
  { id: 'name', label: 'ФІО Заповідача', minWidth: 170 },
  { id: 'code', label: 'Ідентифікаційний код', minWidth: 170 },
  {
    id: 'date',
    label: 'День народження',
    minWidth: 170,
    align: 'right',
    format: (value: string) => dayjs(value).format('YYYY-MM-DD'),
  },
  {
    id: 'type',
    label: 'Вид відомості',
    minWidth: 170,
    align: 'right',
    format: (value: number) => Object.values(DocType)[value] || DocType.WILL,
  },
];

interface Data {
  number: number;
  name: string;
  code: string;
  date: string;
  type: number;
}

function createData(registry: DocRecord[]): Data[] {
  return registry.map((r, indx) => ({
    number: indx + 1,
    name: r.person.fullname,
    code: r.person.taxpayer_code,
    date: r.person.date_of_birth,
    type: r.type,
  }));
}

export default function RegistryTable() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const dispatch = useTypedDispatch();
  const registry = useTypedSelector(loadRegistry);
  console.log(registry);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = React.useCallback(
    (searchData: RegistryFilter) => {
      dispatch(
        fetchRegistryData({ ...searchData, page, per_page: rowsPerPage }),
      );
    },
    [dispatch, page],
  );

  return (
    <Paper sx={{ width: '100%' }}>
      <PaginationSearch onSearch={handleSearch} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(createData(registry.doc.records) || []).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={registry.doc.page}
        count={registry.doc.totalPages}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        size="small"
      />
    </Paper>
  );
}
