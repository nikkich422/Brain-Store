import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
  } from "@mui/material";
  
  const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    confirmColor = "error",
    loading = false,
  }) => {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="font-bold">
          {title}
        </DialogTitle>
  
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
        </DialogContent>
  
        <DialogActions className="p-4">
          <Button
            onClick={onClose}
            color="inherit"
          >
            Cancel
          </Button>
  
          <Button
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmDialog;