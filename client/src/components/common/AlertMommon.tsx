/* eslint-disable react-hooks/rules-of-hooks */
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import { FC, useState } from "react";

interface Props {
  body: string;
}

const AlertMommon: FC<Props> = ({ body }) => {
  const [close, setClose] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: close ? "none" : "block",
        gap: 2,
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Alert
        startDecorator={<WarningIcon />}
        variant="soft"
        color="danger"
        endDecorator={
          <>
            <IconButton
              onClick={() => setClose(true)}
              variant="soft"
              size="sm"
              color="danger"
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      >
        {body}
      </Alert>
    </Box>
  );
};

export default AlertMommon;
