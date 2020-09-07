import { Label, Box, Flex } from 'theme-ui';

export default () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 0 21 21">
        <g
          fill="none"
          fill-rule="evenodd"
          stroke="#2A2E3B"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="translate(6 3)"
        >
          <polyline points="7.324 1.661 7.324 7.318 1.647 7.339" transform="scale(1 -1) rotate(45 15.35 0)" />
          <line x1="4.5" x2="4.5" y1=".5" y2="13.5" />
        </g>
      </svg>
      {/* <Box>
        <Label variant="buttonLabel">Up</Label>
      </Box> */}
    </Flex>
  );
};
