import { Label, Box, Flex } from 'theme-ui';

export default () => {
  return (
    <Box sx={{}}>
      <svg display="block" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          fill-rule="evenodd"
          stroke="#2a2e3b"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="translate(3 2)"
        >
          <path
            d="m.5 9v3.5c0 1.1045695.8954305 2 2 2h7c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2h-3.5"
            transform="matrix(0 1 -1 0 15 3)"
          />
          <path d="m11.5.5v6" />
          <path d="m11.5.5v6" transform="matrix(0 1 -1 0 15 -8)" />
        </g>
      </svg>
      <Label>Add</Label>
    </Box>
  );
};