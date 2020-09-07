import { Label, Box, Flex } from 'theme-ui';

export default () => {
  return (
    <Flex
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ pr: 1 }}>
        <Label variant="buttonLabel">Sign out</Label>
      </Box>
      <svg height="17" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          fill-rule="evenodd"
          stroke="#2a2e3b"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="translate(4 3)"
        >
          <path
            d="m12.717 5.379-.068 4.175-4.175.067"
            transform="matrix(.70710678 .70710678 .70710678 -.70710678 -2.199921 5.311079)"
          />
          <path d="m9 3v9" transform="matrix(0 1 -1 0 16.5 -1.5)" />
          <path
            d="m-1.74806976 2.74806976.0022166 7.50105294c.00091744 1.1043385.89625231 1.9994088 2.00059101 1.9999999h9.99438475c1.1045695 0 2-.8954305 2-2v-7.50105284"
            transform="matrix(0 1 -1 0 12.749 2.249)"
          />
        </g>
      </svg>
    </Flex>
  );
};
