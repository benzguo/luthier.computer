import React, { useState } from 'react';
import Layout from '../components/Layout';
import BrandBadge from '../components/BrandBadge';
import allCards, { cardsById } from '../lib/cards';
import { Button, Image, Box, Text, Link, Badge, Flex, Card } from 'theme-ui';
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
        <Box sx={{ textAlign: 'center', mt: 2, px: 2, pb: 2 }}>
          <Text>
            <Button
              variant="button_link"
              onClick={() => {
                setWeSelected(!weSelected);
              }}
            >
              Luthier
            </Button>{' '}
            ✧{' '}
            <Text>
              <Button
                variant="button_link"
                onClick={() => {
                  setEdisonSelected(!edisonSelected);
                }}
              >
                The Edison
              </Button>{' '}
            </Text>
          </Text>
        </Box>
        {weSelected && (
          <Box sx={{ fontStyle: 'italic', textAlign: 'center', mb: 2 }}>
            The craft of luthiers, lutherie (rarely called "luthiery"), is commonly divided into the two main categories
            of makers of stringed instruments that are plucked or strummed and makers of stringed instruments that are
            bowed.
          </Box>
        )}
        {edisonSelected && (
          <Card variant="card_info" sx={{ p: 2, mt: 1 }}>
            <Box sx={{ textAlign: 'center', my: 0, px: 2, pb: 2, pt: 2, fontStyle: 'bold', fontSize: 4 }}>
              The Edison
            </Box>
            <Box sx={{ my: 0, px: 2, pb: 3, fontStyle: 'normal' }}>
              ✧ the Edison is an exploratorium for music ✧ it's kind of like a synthesizer, but simpler ✧ it's an
              Ableton project with an ideal set of instruments, effects, and parameters for the intuitive exploration of
              soundscapes ✧ it's a vehicle from the MIDIverse ✧
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="https://www.dropbox.com/sh/rerfiwbgzepyhgl/AACib5zfRvXD6v88jhyg8D5wa?dl=0">
                <Button variant="button">Download the Ableton project</Button>
              </Link>
            </Box>
            <Box sx={{ textAlign: 'center', my: 0, py: 0, px: 2, pt: 3, fontStyle: 'bold', fontSize: 4 }}>Hardware</Box>
            <Box sx={{ p: 0, m: 0 }}>
              <ul>
                <li>
                  <Link href="https://www.arturia.com/products/hybrid-synths/keylab-88-mkii/overview">
                    Arturia Keylab 88 MkII
                  </Link>
                </li>
                <li>
                  Audio interface (recommended:{' '}
                  <Link href="https://www.solidstatelogic.com/products/ssl2-plus">SSL2+</Link>)
                </li>
                <li>
                  Speakers (recommended: <Link href="https://www.ikmultimedia.com/products/iloudmtm/">iLoud MTM</Link>)
                </li>
                <li>
                  Expression pedal (recommended: <Link href="https://www.amazon.com/dp/B000NLRWEI">M-Audio</Link>)
                </li>
                <li>
                  Sustain pedal (recommended: <Link href="https://www.amazon.com/dp/B07RXRRH93">Donner</Link>)
                </li>
                <li>
                  Speaker stands (recommended: <Link href="https://output.com/products/stands">Output</Link>)
                </li>
                <li>
                  Piano bench (recommended: <Link href="https://www.amazon.com/dp/B08VL1JC2T">Roland</Link>)
                </li>
                <li>Cables</li>
                <li>Computer</li>
                <li>Post-it notes</li>
              </ul>
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
            <Image src="/diagram.png" />
          </Card>
        )}
      </Box>
      <Box sx={{ textAlign: 'center', pt: 4, pb: 4 }}>✧</Box>
    </Layout>
  );
};

export default Index;
