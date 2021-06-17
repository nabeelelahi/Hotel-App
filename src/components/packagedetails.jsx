import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Container } from '@material-ui/core';


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    backgroundColor: '#c9c9a3',
    borderColor: '#c9c9a3',
    color: '#1c1c15',
    fontFamily: 'unset',
  },
  tablecont:{
      marginTop: '4%',
      marginBottom: '4%'
  }
});

export default function PackageDetails() {
    const classes = useStyles2();
  return (
    <div style={{ backgroundColor: '#ebebc0', padding: '2%', marginTop: '-1%' }}>
         <h2 style={{ color: '#1c1c15', fontFamily: "unset", margin: '2%' }}>Package Details</h2>
      <Container>
    <TableContainer className={classes.tablecont} component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                No. of Rooms
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                No. of Persons
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                6
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                No of Beds
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                3
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Charges per day
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                $1000
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    </div>
  );
}