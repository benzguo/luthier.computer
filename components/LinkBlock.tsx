import React, { useState, useEffect, useRef } from 'react';
import { Card, Text, Flex, Box } from 'theme-ui';
import DeleteToolbar from './DeleteToolbar';
import { readDict } from '../lib/metadataUtils';

export default (props) => {
  const signedIn = props.signedIn;
  // blocks read from all metadata, which is meh but ok
  let content = readDict(props.metadata, props.id);

  return (
    <Card variant="block">
      {content && (
        <Flex
          onClick={() => {
            window.location.assign(content.url);
          }}
          sx={{
            px: 3,
            py: 2,
            justifyContent: 'space-between',
            bg: 'text',
            color: 'offWhite',
            cursor: 'pointer',
            alignItems: 'center',
          }}
        >
          <Text sx={{ fontFamily: 'Inter' }}>{content.text}</Text>
        </Flex>
      )}
      {signedIn && !props.hideToolbar && (
        <DeleteToolbar
          onDelete={props.onDelete}
          hideDown={props.hideDown}
          hideUp={props.hideUp}
          onUp={props.onUp}
          onDown={props.onDown}
        />
      )}
    </Card>
  );
};
