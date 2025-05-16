import React, { useState } from 'react';
import './UniversalSearchBar.scss';
import { TextField, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { setSearchQuery, setSearchFilters } from '../../store/searchSlice';
import { openFilterModal } from '../../store/filterModalSlice';

function UniversalSearchBar() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const filtersActive = useSelector(state => state.filters?.filtersActive);
  const section = useSelector(state => state.section.currentSection);
  const filters = useSelector(state => state.filters);
  const sectionFilters = filters?.[`${section}Filters`] || {};

  const debouncedSearch = debounce(value => {
    dispatch(setSearchQuery(value));
  }, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
  };

  const handleSearchClick = () => {
    dispatch(setSearchQuery(input));
    dispatch(setSearchFilters({ section, filters: sectionFilters }));
  };

  const handleFilterClick = () => {
    dispatch(openFilterModal());
  };

  return (
    <div className="universal-search-bar">
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        value={input}
        onChange={handleInputChange}
        className="search-input"
      />
      <Tooltip title="Search">
        <IconButton onClick={handleSearchClick} color="inherit">
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Filter">
        <IconButton onClick={handleFilterClick} color="inherit">
          {filtersActive ? <FilterListIcon /> : <FilterListOffIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default UniversalSearchBar;
