import { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ProductsSearch } from 'src/sections/product/product-search';
import { ProductsTable } from 'src/sections/product/product-table';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// TODO change this values based on products range prices in DB
export const PRICE_RANGE = {
  min: 0,
  max: 2000
}

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [minPrice, setMinPrice] = useState(PRICE_RANGE.min);
  const [maxPrice, setMaxPrice] = useState(PRICE_RANGE.max);

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage, searchText, minPrice, maxPrice])

  const fetchProducts = async () => {
    const offset = page * rowsPerPage
    const params = {
      page,
      size: rowsPerPage,
      minPrice,
      maxPrice
    }
    if (searchText) {
      params.title = searchText;
    }
    try {
      const res = await axios.get(`${API_URL}/products`, {
        params
      });
      const { content, number, totalElements } = res.data;
      setData(content);
      setPage(number);
      setTotalCount(totalElements);
    } catch (err) {
      console.log(err);
    }

  }

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const onSearch = useCallback(
    (value, minPrice, maxPrice) => {
      setSearchText(value);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
    },
    []
  );


  return (
    <>
      <Head>
        <title>
          Products
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Products
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
            </Stack>
            <ProductsSearch
              onSearch={onSearch}
            />
            <ProductsTable
              count={totalCount}
              items={data}
              onPageChange={handlePageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
