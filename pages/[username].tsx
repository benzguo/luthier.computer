import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import TextBlock from '../components/TextBlock';
import LinkBlock from '../components/LinkBlock';
import PageBlock from '../components/PageBlock';
import PaymentBlock from '../components/PaymentBlock';
import PageFooter from '../components/PageFooter';
import { getOrCreateCustomer, getCustomer } from '../lib/ops';
import { reorder, remove, add, unprefixUsername, generateBlockId, parseBlockId } from '../lib/utils';
import { postMetadataUpdate, readBlockOrder, readDict } from '../lib/metadataUtils';
import { Direction, BlockType } from '../lib/typedefs';
import { useRouter } from 'next/router';
import { Box, Checkbox, Badge, Input, IconButton, Flex, Card, Button, Text, Label, Textarea } from 'theme-ui';
import NumberFormat from 'react-number-format';
import { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/client';
import fetchJson from '../lib/fetchJson';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditButtonIcon from '../components/EditButtonIcon';
import ViewButtonIcon from '../components/ViewButtonIcon';
import AddButtonIcon from '../components/NewButtonIcon';
import BackButtonIcon from '../components/BackButtonIcon';
import SignOutButtonIcon from '../components/SignOutButtonIcon';
import NewMenu from '../components/NewMenu';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentFeedBlock from '../components/PaymentFeedBlock';

let DEBUG = true;
if (process.env.NODE_ENV === 'production') {
  DEBUG = false;
}

const UserPage = (props) => {
  const {
    query: {},
  } = useRouter();

  const defaultText = 'edit me';
  const connectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID}&scope=read_write&state=${props.username}`;

  const disconnectStripe = async function () {
    try {
      await fetchJson('/api/disconnect_stripe', {
        method: 'POST',
      });
      setStripeAccount(null);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  // block ordering, [{i: "b.text.A1B2"}, ...]
  const initialOrder = readBlockOrder(props.metadata) || [];
  const paymentSettings = readDict(props.metadata, 'payment_settings');
  const [tipsEnabled, setTipsEnabled] = useState(paymentSettings.enabled || false);
  const [tipText, setTipText] = useState(paymentSettings.text || 'Leave a tip');
  const [defaultTipAmount, setDefaultTipAmount] = useState(paymentSettings.defaultAmount || 500);
  const [hideTipsFeed, setHideTipsFeed] = useState(paymentSettings.hideFeed || false);
  const [order, setOrder] = useState(initialOrder);
  const [showingNewMenu, setShowingNewMenu] = useState(false);
  const [previewing, setPreviewing] = useState(DEBUG ? false : true);
  const [metadata, setMetadata] = useState(props.metadata);
  const initialStripeAccount = readDict(props.metadata, 'stripe_account');
  const [stripeAccount, setStripeAccount] = useState(initialStripeAccount);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stripeOpts = {};
  if (stripeAccount) {
    stripeOpts['stripeAccount'] = stripeAccount.id;
  }
  let stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (props.signedIn) {
    stripeKey = process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY;
  }
  const stripePromise = loadStripe(stripeKey, stripeOpts);

  const syncOrder = async function (newOrder: Record<string, string>[], removedId: string | null = null) {
    try {
      await postMetadataUpdate('b.order', newOrder, props.customerId, props.username, removedId);
      // don't need to call setMetadata if updating order only
    } catch (e) {
      console.error(e);
    }
  };

  const syncNewBlock = async function (id: string, value: string, order: Record<string, string>[]) {
    try {
      setShowingNewMenu(false);
      const newMetadata = await postMetadataUpdate(id, value, props.customerId, props.username, null, order);
      DEBUG && console.table(newMetadata);
      setMetadata(newMetadata);
    } catch (e) {
      console.error(e);
    }
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newItems = reorder(order, result.source.index, result.destination.index);
    setOrder(newItems);
    syncOrder(newItems);
  };

  const moveBlock = (index: number, direction: Direction) => {
    if (index === 0 && direction === Direction.Up) {
      return;
    }
    const newIndex = direction === Direction.Up ? index - 1 : index + 1;
    const newItems = reorder(order, index, newIndex);
    setOrder(newItems);
    syncOrder(newItems);
  };

  const removeBlock = (index: number) => {
    const result = remove(order, index);
    setOrder(result.items);
    syncOrder(result.items, result.removedId);
  };

  const addTextBlock = async () => {
    const id = generateBlockId(BlockType.Text);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    await syncNewBlock(id, defaultText, newItems);
    setOrder(newItems);
  };

  const addLinkBlock = async (content: any) => {
    const id = generateBlockId(BlockType.Link);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    const value = JSON.stringify({ text: content.text, url: content.url, comment: content.comment });
    await syncNewBlock(id, value, newItems);
    setOrder(newItems);
  };

  return (
    <Elements stripe={stripePromise}>
      <Layout>
        {props.error && (
          <Textarea my={4} rows={10}>
            {JSON.stringify(props.error, null, 2)}
          </Textarea>
        )}
        {!props.error && (
          <>
            <Header profileImage={props.profileImage} name={props.name} username={props.username} />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {order &&
                      order.map((orderItem, index) => {
                        return (
                          <Draggable
                            key={orderItem.i}
                            draggableId={orderItem.i}
                            index={index}
                            isDragDisabled={!props.signedIn || previewing}
                          >
                            {(provided, snapshot) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                {parseBlockId(orderItem.i) === BlockType.Text && (
                                  <Box
                                    sx={{
                                      py: 2,
                                    }}
                                  >
                                    <TextBlock
                                      default={defaultText}
                                      previewing={previewing}
                                      id={orderItem.i}
                                      hideUp={index === 0}
                                      hideDown={index === order.length - 1}
                                      hideToolbar={previewing}
                                      metadata={metadata}
                                      username={props.username}
                                      customerId={props.customerId}
                                      signedIn={props.signedIn}
                                      onDown={() => {
                                        moveBlock(index, Direction.Down);
                                      }}
                                      onUp={() => {
                                        moveBlock(index, Direction.Up);
                                      }}
                                      onDelete={() => {
                                        removeBlock(index);
                                      }}
                                    />
                                  </Box>
                                )}
                                {parseBlockId(orderItem.i) === BlockType.Link && (
                                  <Box
                                    sx={{
                                      py: 2,
                                    }}
                                  >
                                    <LinkBlock
                                      id={orderItem.i}
                                      hideUp={index === 0}
                                      hideDown={index === order.length - 1}
                                      hideToolbar={previewing}
                                      metadata={metadata}
                                      username={props.username}
                                      customerId={props.customerId}
                                      signedIn={props.signedIn}
                                      onDown={() => {
                                        moveBlock(index, Direction.Down);
                                      }}
                                      onUp={() => {
                                        moveBlock(index, Direction.Up);
                                      }}
                                      onDelete={() => {
                                        removeBlock(index);
                                      }}
                                    />
                                  </Box>
                                )}
                                {true && (
                                  <Box
                                    sx={{
                                      py: 2,
                                    }}
                                  >
                                    <PageBlock
                                      id={orderItem.i}
                                      hideUp={index === 0}
                                      hideDown={index === order.length - 1}
                                      hideToolbar={previewing}
                                      metadata={metadata}
                                      username={props.username}
                                      customerId={props.customerId}
                                      signedIn={props.signedIn}
                                      onDown={() => {
                                        moveBlock(index, Direction.Down);
                                      }}
                                      onUp={() => {
                                        moveBlock(index, Direction.Up);
                                      }}
                                      onDelete={() => {
                                        removeBlock(index);
                                      }}
                                    />
                                  </Box>
                                )}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {showingNewMenu && !previewing && (
              <NewMenu
                onClick={(result) => {
                  console.log(result);
                  switch (result.type as BlockType) {
                    case BlockType.Text:
                      addTextBlock();
                      break;
                    case BlockType.Link:
                      addLinkBlock(result);
                      break;
                    case BlockType.Unknown:
                      // no-op
                      break;
                  }
                }}
              />
            )}

            {props.signedIn && (
              <Flex sx={{ py: 4, mx: 2, justifyContent: 'space-between' }}>
                <Box>
                  <IconButton
                    sx={{ fontSize: '24px', visibility: previewing ? 'hidden' : 'visible' }}
                    variant={showingNewMenu ? 'iconselected' : 'icon'}
                    onClick={() => {
                      setShowingNewMenu(!showingNewMenu);
                    }}
                  >
                    {showingNewMenu ? <BackButtonIcon /> : <AddButtonIcon />}
                  </IconButton>
                </Box>
                <Box>
                  <IconButton
                    variant={!previewing && !showingNewMenu ? 'iconselected' : 'icon'}
                    onClick={() => {
                      setPreviewing(!previewing);
                    }}
                  >
                    {previewing ? <EditButtonIcon /> : <ViewButtonIcon />}
                  </IconButton>
                </Box>
              </Flex>
            )}

            {stripeAccount && tipsEnabled && (
              <>
                <PaymentBlock text={tipText} defaultAmount={defaultTipAmount} hideTipsFeed={hideTipsFeed} />
              </>
            )}

            <Box my={4} />
          </>
        )}
        <PageFooter />
        {props.signedIn && (
          <Card variant="block" sx={{ p: 3, mb: 4, border: '1px dotted lightGray' }}>
            <Box>
              {!stripeAccount && (
                <Box pt={2}>
                  <Text variant="small">Tray makes it easy to collect tips on your page.</Text>
                  <Text variant="small">Connect a Stripe account to get started. </Text>
                  <Box pt={3}>
                    <Button
                      variant="tiny"
                      mr={2}
                      onClick={() => {
                        window.location.assign(connectUrl);
                      }}
                    >
                      Connect Stripe
                    </Button>{' '}
                  </Box>
                </Box>
              )}
              {stripeAccount && (
                <Box>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Flex>
                      <Label sx={{ bg: tipsEnabled ? 'lightGreen' : 'offWhite', p: 1, borderRadius: 8 }}>
                        <Flex sx={{ alignItems: 'center' }}>
                          <Checkbox defaultChecked={tipsEnabled} onChange={(e) => setTipsEnabled(e.target.checked)} />
                          <Text variant="small">Enable tips</Text>
                        </Flex>
                      </Label>
                    </Flex>
                  </Flex>
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      mb: 2,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: `1px ${tipsEnabled ? 'dashed' : 'none'} lightGreen`,
                      bg: 'offWhite',
                    }}
                  >
                    <Box sx={{ alignItems: 'center', mb: 2 }}>
                      <Label sx={{ mb: 2 }}>Button text</Label>
                      <Input
                        disabled={!tipsEnabled}
                        variant="standardInput"
                        sx={{ textAlign: 'center', bg: 'transparent', border: `1px dotted lightGray` }}
                        defaultValue={tipText}
                        onChange={(e) => setTipText(e.target.value)}
                      />
                    </Box>
                    <Box sx={{ alignItems: 'center', mb: 0 }}>
                      <Label sx={{ mb: -3 }}>Default amount</Label>
                      <NumberFormat
                        disabled={!tipsEnabled}
                        name="amount"
                        id="amount"
                        decimalScale={0}
                        allowEmptyFormatting={true}
                        allowNegative={false}
                        type="tel"
                        defaultValue={(defaultTipAmount as number) / 100.0}
                        displayType={'input'}
                        thousandSeparator={true}
                        prefix={'$'}
                        customInput={Input}
                        renderText={(value) => <Input value={value} />}
                        onValueChange={(values) => setDefaultTipAmount(~~(values.floatValue * 100))}
                      />
                    </Box>
                    <Label>
                      <Flex sx={{ alignItems: 'center' }}>
                        <Checkbox
                          disabled={!tipsEnabled}
                          defaultChecked={hideTipsFeed}
                          onChange={(e) => setHideTipsFeed(e.target.checked)}
                        />
                        <Text variant="tiny">Hide feed</Text>
                      </Flex>
                    </Label>
                  </Box>
                  <Flex sx={{ mt: 3 }}>
                    <Flex>
                      <Label sx={{ bg: 'lightBlue', p: 1, borderRadius: 8 }}>
                        <Text variant="small">Connected to Stripe</Text>
                      </Label>
                    </Flex>
                  </Flex>
                  <Flex
                    sx={{
                      p: 2,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: `1px dashed lightBlue`,
                      bg: 'offWhite',
                    }}
                  >
                    <Text sx={{ fontSize: 13 }}>{stripeAccount.name}</Text>
                    <Button
                      variant="tiny"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        disconnectStripe();
                      }}
                    >
                      Disconnect Stripe
                    </Button>{' '}
                  </Flex>
                  {errorMessage && <Text variant="small">{errorMessage}</Text>}
                </Box>
              )}
            </Box>

            <Flex sx={{ bg: 'transparent', flexDirection: 'row-reverse', mt: 3 }}>
              <Button onClick={() => signOut()} variant="tiny" sx={{ color: 'lightGray', cursor: 'pointer' }}>
                <SignOutButtonIcon />
              </Button>
            </Flex>
          </Card>
        )}
      </Layout>
    </Elements>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;
  const username = unprefixUsername(query.username as string);
  const session = await getSession(ctx);
  let error = null;
  let customer = null;
  let signedIn = false; // signed in as this user
  let sessionUsername = null;
  // signedIn: check session against url
  if (session && session.user.username) {
    sessionUsername = session.user.username;
    signedIn = sessionUsername === username;
  }
  let response = null;
  if (signedIn) {
    response = await getOrCreateCustomer(session, signedIn);
  } else {
    response = await getCustomer(username);
  }
  if (response.errored) {
    return {
      props: {
        error: response.data,
      },
    };
  }
  customer = response.data;
  let metadata = null;
  let customerId = null;
  if (customer) {
    metadata = customer.metadata || null;
    customerId = customer.id || null;
  }
  return {
    props: {
      username: username,
      name: metadata.name,
      profileImage: metadata.profile_image,
      metadata: metadata,
      customerId: customerId,
      signedIn: signedIn,
      error: error,
    },
  };
};

export default UserPage;
