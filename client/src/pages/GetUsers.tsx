import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { getAllLogout } from "@/utils/api";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function GetUsers() {
  const query = useQuery({
    queryKey: ["getAllLogout"],
    queryFn: async () => {
      return await getAllLogout();
    },
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell>email</StyledTableCell>
          </TableRow>
        </TableHead>
        {query.isLoading ? (
          <>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  <Skeleton animation="wave" />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton animation="wave" />
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </>
        ) : (
          <>
            <TableBody>
              {query.data.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </TableContainer>
  );
}
