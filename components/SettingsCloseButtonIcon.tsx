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
            transform="translate(3 3)"
          >
            <path d="m5.5.5v5h-5.5" transform="matrix(1 0 0 -1 0 15)" />
            <path d="m5.5.5v5h-5.5" transform="matrix(-1 0 0 -1 15 15)" />
            <path d="m5.5.5v5.5h-5" transform="matrix(0 1 1 0 -.5 0)" />
            <path d="m5.5.5v5.5h-5" transform="matrix(0 1 -1 0 15.5 0)" />
          </g>
        </svg>
      </Box>
      <Box>
        <Label>Settings</Label>
      </Box>
    </Flex>
  );
};
