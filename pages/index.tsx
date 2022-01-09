import React, { useState } from 'react';
import Layout from '../components/Layout';
import BrandBadge from '../components/BrandBadge';
import allCards, { cardsById } from '../lib/cards';
import { Button, Image, Box, Text, Link, Heading, Flex, Card } from 'theme-ui';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

const url = `https://luthier.computer`;
const description = 'magical instruments';

const Index = () => {
  let selected = null;
  let cards = [];
  let headings = null;
  let data = cardsById['c-7'];
  cards.push(data);
  selected = data;
  const title = `✧ luthier.computer`;
  const previewImage = `http://luthier.computer/rider-waite/${selected.id}.png`;
  const [weSelected, setWeSelected] = useState<Boolean>(true);
  const [starterSelected, setStarterSelected] = useState<Boolean>(true);

  return (
    <Layout>
      <Box sx={{ flexDirection: 'column', justifyContent: 'center', mt: 4, mb: 0 }}>
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            url: url,
            title: title,
            description,
            images: [{ url: previewImage, alt: title }],
            site_name: 'luthier.computer',
          }}
        />
        <Flex sx={{ justifyContent: 'center' }}>
          <Flex sx={{ flexDirection: 'row', justifyContent: 'center' }}>
            {cards.map((card, i) => (
              <Flex
                key={card.id}
                sx={{ mx: 1, mt: 3, mb: 3, width: 300, flexDirection: 'column', alignItems: 'center' }}
              >
                {headings && <Text sx={{ fontFamily: 'mono', fontWeight: 'bold', mb: 2 }}>{headings[i]}</Text>}
                <Card variant={`card_foil`}>
                  <Image
                    src={`/rider-waite/${card.id}.png`}
                    sx={{ transform: card.reversed ? 'rotate(180deg);' : 'none' }}
                  />
                </Card>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <BrandBadge />
        <Box sx={{ textAlign: 'center', px: 2 }}>
          <Link href="https://soundcloud.com/luthier_computer">soundcloud</Link>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2, px: 2 }}>
          <Text>
            <Button
              variant="button_link"
              onClick={() => {
                setWeSelected(!weSelected);
              }}
            >
              We
            </Button>{' '}
            make stuff to help you make music.
          </Text>
        </Box>
        {weSelected && (
          <Box>
            <Box sx={{ textAlign: 'center', px: 2 }}>
              <Link href="https://robertkarpay.bandcamp.com">Robert Karpay</Link> – composer
            </Box>
            <Box sx={{ textAlign: 'center', px: 2 }}>
              <Link href="https://twitter.com/bgdotjpg">Ben Guo</Link> – builder, occasional composer
            </Box>
          </Box>
        )}
        <Box sx={{ textAlign: 'center', px: 2 }}>
          <Text>
            <Button
              variant="button_link"
              onClick={() => {
                setStarterSelected(!starterSelected);
              }}
            >
              The Edison
            </Button>{' '}
            is our prototype instrument.
          </Text>
        </Box>
        {starterSelected && (
          <Box>
            <Box sx={{ textAlign: 'center', my: 0, px: 2 }}>WIP</Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Index;
