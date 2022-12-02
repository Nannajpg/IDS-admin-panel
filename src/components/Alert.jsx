import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const Alert = ({ title, message, action, open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    action();
    setOpen(false);
  };

  //tema para colores de la alerta
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7ea6ae"
      },
      secondary: {
        main: "#63130b",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          keepMounted={false}
          maxWidth="sm"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleClick}>Aceptar</Button>
          </DialogActions>
        </Dialog>
    </ThemeProvider>
  );
};

export default Alert;