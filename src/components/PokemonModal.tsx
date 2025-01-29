import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { PokemonDetailsModel } from "../models/pokemon-details.model";

type PokemonDetailsModalProps = {
  isOpen: boolean;
  details: PokemonDetailsModel | null;
  onClose: () => void;
};

const PokemonDetailsModal = ({ isOpen, details, onClose }: PokemonDetailsModalProps) => {
  if (!isOpen || !details) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {details.name}'s photo
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          
        </DialogContentText>
        <Box>
          <img
            src={details.sprites.font_default}
            alt={details.name}
            style={{ display: "block", margin: "0 auto" }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
    // <Dialog
    //     open={isOpen}
    //     onClose={onClose}
    //     aria-labelledby="alert-dialog-title"
    //     aria-describedby="alert-dialog-description"
    //   >
    //     <DialogTitle id="alert-dialog-title">
    //       {"Use Google's location service?"}
    //     </DialogTitle>
    //     <DialogContent>
    //       <DialogContentText id="alert-dialog-description">
    //         Let Google help apps determine location. This means sending anonymous
    //         location data to Google, even when no apps are running.
    //       </DialogContentText>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={onClose}>Disagree</Button>
    //       <Button onClick={onClose} autoFocus>
    //         Agree
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
  );
};

export default PokemonDetailsModal;
