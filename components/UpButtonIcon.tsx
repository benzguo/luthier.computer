import { Label, Box, Flex } from 'theme-ui';

export default () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box>
        <svg display="block" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="#2a2e3b"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(0 -1 1 0 2 19)"
          >
            <circle cx="8.5" cy="8.5" r="8" />
            <path
              d="m11.621 6.379v4.242h-4.242"
              transform="matrix(.70710678 .70710678 .70710678 -.70710678 -3.227683 7.792317)"
            />
            <path d="m8.5 4.5v8" transform="matrix(0 1 -1 0 17 0)" />
          </g>
        </svg>
      </Box>
      <Box>
        <Label>Up</Label>
      </Box>
    </Flex>
  );
};
