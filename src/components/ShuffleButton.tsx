'use client';
import { Button } from '@mui/material';
import { Shuffle as ShuffleIcon } from '@mui/icons-material';

interface ShuffleButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ShuffleButton({ onClick, disabled = false }: ShuffleButtonProps) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={<ShuffleIcon />}
      disabled={disabled}
      sx={{ mb: 2, ml: 1 }}
    >
      Reshuffle
    </Button>
  );
}
