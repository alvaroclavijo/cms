import { useCallback, useEffect, useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, Slider, Typography } from '@mui/material';
import { PRICE_RANGE } from 'src/pages/products';

export const ProductsSearch = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState([PRICE_RANGE.min, PRICE_RANGE.max]);

  const handleSearchChange = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  const handlePriceChange = useCallback((event, newPriceRange) => {
    setPriceRange(newPriceRange);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchText, priceRange[0], priceRange[1]);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, priceRange, onSearch]);

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search product"
        onChange={handleSearchChange}
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500, mb: 2 }}
      />
      <Typography
        sx={{ fontWeight: 'bold', mb: 2, ml: 2 }}
        variant="body2"
        gutterBottom
      >
        Price Range:
      </Typography>
      <Slider
        sx={{ maxWidth: 700, mb: 2, ml: 3 }}
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        min={PRICE_RANGE.min}
        max={PRICE_RANGE.max}
      />
    </Card>
  );
};