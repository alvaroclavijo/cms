import { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ProductsSearch } from 'src/sections/product/product-search';
import { ProductsTable } from 'src/sections/product/product-table';
import axios from 'axios';

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage])

  const fetchProducts = async () => {
    try {
      const offset = page * rowsPerPage
      const res = await axios.get("https://5c6c8bac-c2e8-43fa-8a57-a7dcdf0728e6.mock.pstmn.io/products", {
        params: {
          offset: offset,
          size: rowsPerPage
        }
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
            <ProductsSearch />
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
