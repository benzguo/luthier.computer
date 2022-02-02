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
        <Box sx={{ textAlign: 'center', px: 2, mb: 4 }}>
          <Link href="https://soundcloud.com/luthier_computer">soundcloud</Link>
          {' ✧ '}
          <Link href="https://luthiercomputer.substack.com">newsletter</Link>
        </Box>
        <Box sx={{ fontStyle: 'italic', justifyContent: 'center', mb: 2 }}>
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vSDwbwueKAbyogIrVNStXjqJcTvAsIZn-45hVgLOsoxYsVav_Rdm2Y-lQsduTSC4gDqdqfU9DP265-P/embed?start=true&loop=true&delayms=5000"
            frameBorder="0"
            width="960"
            height="569"
          ></iframe>
        </Box>
        <Flex>
          <Card variant="card_info" sx={{ p: 2, mt: 1, maxWidth: 400, pl: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="https://www.dropbox.com/sh/87skwu7r2rw0qkb/AABRFypOMV-jxr01T-H3MZXaa?dl=0">
                <Button variant="button" sx={{ backgroundColor: '#C0FBFD' }}>
                  Download the Edison Lite
                </Button>
              </Link>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Text>
                for <Link href="https://www.ableton.com/en/products/live-lite/">Ableton Live 11 Lite</Link>, free with
                the Arturia
              </Text>
            </Box>
            <Box sx={{ textAlign: 'center', fontStyle: 'italic' }}>
              <Text>No additional plugins required</Text>
            </Box>

            <Box sx={{ textAlign: 'center', my: 0, py: 0, px: 2, pt: 3, fontStyle: 'bold', fontSize: 5 }}>Hardware</Box>
            <Box sx={{ p: 0, m: 0 }}>
              <ul>
                <li>
                  <Link href="https://www.arturia.com/products/hybrid-synths/keylab-88-mkii/overview">
                    Arturia Keylab 88 MkII
                  </Link>
                </li>
                <li>
                  Audio interface (rec: <Link href="https://www.solidstatelogic.com/products/ssl2-plus">SSL2+</Link>)
                </li>
                <li>
                  Speakers (rec: <Link href="https://www.ikmultimedia.com/products/iloudmtm/">iLoud MTM</Link>)
                </li>
                <li>
                  Expression pedal (rec: <Link href="https://www.amazon.com/dp/B000NLRWEI">M-Audio</Link>)
                </li>
                <li>
                  Sustain pedal (rec: <Link href="https://www.amazon.com/dp/B07RXRRH93">Donner</Link>)
                </li>
                <li>
                  Speaker stands (rec: <Link href="https://output.com/products/stands">Output</Link>)
                </li>
                <li>
                  Piano bench (rec: <Link href="https://www.amazon.com/dp/B08VL1JC2T">Roland</Link>)
                </li>
                <li>Cables</li>
                <li>Computer</li>
                <li>Post-it notes</li>
              </ul>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 7 }}>
              <Link href="https://www.dropbox.com/sh/rerfiwbgzepyhgl/AACib5zfRvXD6v88jhyg8D5wa?dl=0">
                <Button variant="button" sx={{ backgroundColor: '#F3C0FD' }}>
                  Download the Edison Suite
                </Button>
              </Link>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              for <Link href="https://www.ableton.com/en/live/compare-editions/">Ableton Live 11 Suite</Link>
            </Box>
            <Box sx={{ textAlign: 'center', my: 0, py: 0, px: 2, fontStyle: 'italic', fontSize: 3 }}>
              Requires the plugins below:
            </Box>
            <Box sx={{ p: 0, m: 0 }}>
              <ul>
                <li>
                  <Link href="https://www.modartt.com/pianoteq">Modartt Pianoteq 7 Standard</Link>
                </li>
                <ul>
                  <li>
                    <Link href="https://www.modartt.com/steingraeber">Steingraeber E-272</Link>
                  </li>
                  <li>
                    <Link href="https://www.modartt.com/harpsichord">Harpsichord Hans Ruckers II</Link>
                  </li>
                  <li>
                    <Link href="https://www.modartt.com/harp">Harp Pack</Link>
                  </li>
                  <li>
                    <Link href="https://www.modartt.com/celeste">Celeste Pack</Link>
                  </li>
                </ul>
              </ul>
            </Box>
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
          </Card>
          <Card variant="card_info" sx={{ p: 2, mt: 1, maxWidth: 600, pl: 3 }}>
            <Image src="/full.jpg" />
            <Image src="/diagram-lite.png" />
            <Image src="/closeup.jpg" />
            <Image src="/diagram-suite.png" />
          </Card>
        </Flex>
      </Box>
      <iframe
        src="https://docs.google.com/presentation/d/e/2PACX-1vTLfUcyMCcCJp0TGy8ueBZIP0hTQal5LgFFaxvw-UuIeHkakdCIPC0H2cRsa--6qUDfRbEvuW6rTlHz/embed?start=false&loop=false&delayms=5000"
        frameBorder="0"
        width="960"
        height="569"
      ></iframe>

      <Box sx={{ textAlign: 'center', pt: 4, pb: 4 }}>✧</Box>
    </Layout>
  );
};

export default Index;
