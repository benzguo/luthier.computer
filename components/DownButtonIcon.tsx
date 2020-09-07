import { Label, Box, Flex } from 'theme-ui';

export default () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <svg height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          fill-rule="evenodd"
          stroke="#2a2e3b"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="translate(6 4)"
        >
          <path
            d="m7.328 6.67.001 5.658-5.658-.001"
            transform="matrix(-.70710678 .70710678 .70710678 .70710678 .965201 -.399799)"
          />
          <path d="m4.5.5v13" />
        </g>
      </svg>
      {/* <Box>
        <Label variant="buttonLabel">Down</Label>
      </Box> */}
    </Flex>
  );
};
