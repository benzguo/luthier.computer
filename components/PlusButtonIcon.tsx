import { Flex } from 'theme-ui';

export default () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <svg height="30" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          fill-rule="evenodd"
          stroke="#2a2e3b"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="translate(4 4)"
        >
          <path
            d="m10.5.5h-8c-1.1045695 0-2 .8954305-2 2v8c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2v-8c0-1.1045695-.8954305-2-2-2z"
            transform="matrix(0 1 -1 0 13 0)"
          />
          <path d="m6.5 3.5v6.056" />
          <path d="m6.5 3.5v6" transform="matrix(0 1 -1 0 13 0)" />
        </g>
      </svg>
    </Flex>
  );
};
