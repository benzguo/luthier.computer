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
  const [weSelected, setWeSelected] = useState<Boolean>(false);
  const [edisonSelected, setEdisonSelected] = useState<Boolean>(true);

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
            <Box sx={{ textAlign: 'center', px: 2, fontStyle: 'italic' }}>
              <Link href="https://robertkarpay.bandcamp.com">Robert Karpay</Link> +{' '}
              <Link href="https://twitter.com/bgdotjpg">Ben Guo</Link>
            </Box>
          </Box>
        )}
        <Box sx={{ textAlign: 'center', px: 2 }}>
          <Text>
            <Button
              variant="button_link"
              onClick={() => {
                setEdisonSelected(!edisonSelected);
              }}
            >
              The Edison
            </Button>{' '}
            is our prototype instrument.
          </Text>
        </Box>
        {edisonSelected && (
          <Card variant="card_info" sx={{ p: 2, mt: 1 }}>
            <Box sx={{ textAlign: 'center', my: 0, px: 2, pb: 2, pt: 2, fontStyle: 'bold', fontSize: 4 }}>
              The Edison v0
            </Box>
            <Box sx={{ my: 0, px: 2, pb: 2, fontStyle: 'normal' }}>
              The Edison is the{' '}
              <Link href="https://www.arturia.com/products/hybrid-synths/keylab-88-mkii/overview">
                Arturia KeyLab 88 MkII
              </Link>{' '}
              paired with a simple and expressive Ableton plugin chain.{' '}
              <Link href="https://www.dropbox.com/sh/j1x2p1vijtmvvqn/AACvbs1l81rA74LOGC_KcMlqa?dl=0">
                Download the Ableton project
              </Link>{' '}
              (comes with MIDI from these{' '}
              <Link href="https://soundcloud.com/luthier_computer/sets/bathtime-improvisations">improvisations</Link> by
              Rob).
            </Box>
            <Box sx={{ textAlign: 'center', my: 0, py: 0, px: 2, pt: 2, fontStyle: 'bold', fontSize: 4 }}>
              Instruments
            </Box>
            <Box sx={{ p: 0, m: 0 }}>
              <ul>
                <li>
                  <Link href="https://www.modartt.com/pianoteq">Modartt Pianoteq 7 Standard</Link>
                </li>
                <li>
                  <Link href="https://www.modartt.com/harpsichord">Modartt Harpsichord Hans Ruckers II</Link>
                </li>
                <li>
                  <Link href="https://www.modartt.com/harp">Modartt Harp Pack</Link>
                </li>
                <li>
                  <Link href="https://www.modartt.com/celeste">Modartt Celeste Pack</Link>
                </li>
                <li>
                  <Link href="https://www.native-instruments.com/en/pricing/una-corda/">
                    Native Instruments Una Corda
                  </Link>
                </li>
              </ul>
            </Box>
            <Box sx={{ textAlign: 'center', my: 0, py: 0, px: 2, fontStyle: 'bold', fontSize: 4 }}>Effects</Box>
            <Box sx={{ p: 0, m: 0 }}>
              <ul>
                <li>
                  <Link href="https://valhalladsp.com/shop/reverb/valhalla-vintage-verb/">Valhalla Vintage Verb</Link>
                </li>
                <li>
                  <Link href="https://output.com/products/thermal">Output Thermal Distortion</Link>
                </li>
                <li>
                  <Link href="https://output.com/products/portal">Output Portal Granular Delay</Link>
                </li>
              </ul>
            </Box>
            <Image src="/sliders.jpg" />
          </Card>
        )}
      </Box>
      <Box sx={{ textAlign: 'center', pt: 4, pb: 4 }}>✧</Box>
    </Layout>
  );
};

export default Index;
