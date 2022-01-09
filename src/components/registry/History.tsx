import * as React from 'react';
import {
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs from 'dayjs';
import { useTypedDispatch, useTypedSelector } from 'src/store';
import { DocType } from 'src/common/enums/app/doc-type.enum';
import { DocRecord } from 'src/interfaces/services/models/Record';
import { HistoryRec } from 'src/interfaces/services/models/HistoryRec';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { getHistoryByRegistryId } from 'src/store/registry/actions';

interface Data {
  type: string;
  blanks_numbers: string;
  sertificating_date: string;
  sertificating_place: string;
  taxpayer_code: string;

  fullname: string;
  place_of_living: string;
  place_of_birth: string;
  date_of_birth: string;
}

const createData = (doc: HistoryRec) => {
  const { edit } = doc;
  const rec: Record<string, string> = {};
  if (edit.type)
    rec['type'] = Object.values(DocType)[edit.type] || DocType.WILL;
  if (edit.blanks_numbers)
    rec['blanks_numbers'] = edit.blanks_numbers.toString();
  if (edit.sertificating_date)
    rec['sertificating_date'] = dayjs(edit.sertificating_date).format(
      'YYYY-MM-DD',
    );
  if (edit.sertificating_place) {
    const { country, line_1, line_2 } = edit.sertificating_place;
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Персональні дані
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
};

export const History = (props: { registryId: number }) => {
  const dispatch = useTypedDispatch();

  const [rows, setRows] = React.useState<HistoryRec[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    async function fetchData() {
      const history = await dispatch(getHistoryByRegistryId(props.registryId));
      console.log(history, 'dispatch');
      if (history) setRows(history);
    }
    fetchData();
  }, [dispatch, props.registryId]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell> {'Дата та час'}</TableCell>
              <TableCell align="right">{'Реєстратор'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.time}>
                    <TableCell>{`${new Date(row.time)
                      .toISOString()
                      .substring(0, 10)} ${new Date(row.time)
                      .toISOString()
                      .substring(11, 19)}`}</TableCell>
                    <TableCell align="right">{row.user.name}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        SelectProps={{
          inputProps: {
            'aria-label': 'к-ть рядків',
          },
          native: true,
        }}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
