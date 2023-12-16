import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { ProductsSearch } from 'src/sections/product/product-search';
import { ProductsTable } from 'src/sections/product/product-table';

const now = new Date();

const data = [
  {
    "id": "d24c159a-4c6e-4a18-b35a-60e3e35bae25",
    "title": "Acer Laptop",
    "price": 799.99,
    "quantity": 30,
    "sku": "ACR123"
  },
  {
    "id": "64e87e6d-8a17-46cc-881d-2b727c9a8b41",
    "title": "Samsung Smartphone",
    "price": 499.99,
    "quantity": 50,
    "sku": "SAMS456"
  },
  {
    "id": "98cf0e1c-74e2-4ef3-8b6e-24ff9c5d30b8",
    "title": "LG Refrigerator",
    "price": 1299.99,
    "quantity": 20,
    "sku": "LGR789"
  },
  {
    "id": "31e4050c-d345-4da9-9e23-3e1cf49b8ae7",
    "title": "Whirlpool Washing Machine",
    "price": 599.99,
    "quantity": 25,
    "sku": "WHP101"
  },
  {
    "id": "be0d0e3c-3c3e-4ac7-9cc0-258ea5ff00fb",
    "title": "Panasonic Microwave Oven",
    "price": 129.99,
    "quantity": 40,
    "sku": "PMC555"
  },
  {
    "id": "7e8a9c1e-cf48-4e49-8f67-124f1f8a6bf2",
    "title": "Sony TV",
    "price": 899.99,
    "quantity": 15,
    "sku": "SNTV777"
  },
  {
    "id": "85a9b35a-80b2-429a-aa44-356a4e433d24",
    "title": "Lenovo Tablet",
    "price": 299.99,
    "quantity": 35,
    "sku": "LENT456"
  },
  {
    "id": "5ae4d9d5-bb89-477f-ba85-9f774c3762f9",
    "title": "Dyson Vacuum Cleaner",
    "price": 399.99,
    "quantity": 18,
    "sku": "DYVAC22"
  },
  {
    "id": "32dce2a9-46dd-45f2-a2a2-13ea3c1f086e",
    "title": "Canon Camera",
    "price": 699.99,
    "quantity": 22,
    "sku": "CNCM123"
  },
  {
    "id": "e14292b7-d9e9-4974-a525-32071bfcd080",
    "title": "LG Air Conditioner",
    "price": 899.99,
    "quantity": 12,
    "sku": "LGAC789"
  },
  {
    "id": "2c938e92-708b-4b6d-8a12-7c29f0ad8b1c",
    "title": "HP Printer",
    "price": 129.99,
    "quantity": 28,
    "sku": "HPPR101"
  },
  {
    "id": "2b46b270-1462-4e34-8a36-1bc5e1d00217",
    "title": "Bose Speakers",
    "price": 299.99,
    "quantity": 24,
    "sku": "BOSE555"
  },
  {
    "id": "09f6a717-0d80-4a7a-9341-7e4d71ba8bfe",
    "title": "Dell Monitor",
    "price": 399.99,
    "quantity": 20,
    "sku": "DELMNTR22"
  },
  {
    "id": "71cf746c-09a7-4775-9f86-9db1f5f07c7b",
    "title": "Corsair Mechanical Keyboard",
    "price": 149.99,
    "quantity": 32,
    "sku": "CSMK555"
  },
  {
    "id": "15a0a1e1-5d07-4a74-b06b-1cbfbdd7d76b",
    "title": "Logitech Mouse",
    "price": 49.99,
    "quantity": 45,
    "sku": "LOGM987"
  },
  {
    "id": "1c8e150d-0883-46fb-b471-606458d22e78",
    "title": "TP-Link Router",
    "price": 79.99,
    "quantity": 38,
    "sku": "TPLR123"
  },
  {
    "id": "c2ec98d7-84eb-475e-8b4f-7e20de64c3ea",
    "title": "Seagate External Hard Drive",
    "price": 89.99,
    "quantity": 30,
    "sku": "SEHD789"
  },
  {
    "id": "9516bc0d-5d24-4db4-a2b9-24f769d05df9",
    "title": "Epson Projector",
    "price": 599.99,
    "quantity": 15,
    "sku": "EPJ789"
  },
  {
    "id": "f151d146-5d7a-4cf4-a94f-cb4f6a3a098d",
    "title": "Garmin Smartwatch",
    "price": 199.99,
    "quantity": 28,
    "sku": "GARSW456"
  },
  {
    "id": "32b13d19-26f0-44ec-b2ae-f24c0590e13f",
    "title": "Oster Blender",
    "price": 69.99,
    "quantity": 40,
    "sku": "OSTBL123"
  },
  {
    "id": "e2922c02-5be0-468b-8b8f-2b799708b7a5",
    "title": "Black+Decker Iron",
    "price": 39.99,
    "quantity": 50,
    "sku": "BDIRN555"
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
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
                  Customers
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
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
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
