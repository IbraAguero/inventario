import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledSearchInput = ({ searchText, onSearchTextChange }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      color="#fff"
      border="solid 1px #fff"
      borderRadius={1}
    >
      <InputBase
        sx={{ ml: 2, flex: 1, color: '#fff' }}
        placeholder="Buscar"
        value={searchText}
        onChange={(event) => onSearchTextChange(event)}
      />
      <IconButton type="button" sx={{ p: 1, color: '#fff' }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};
export default StyledSearchInput;
