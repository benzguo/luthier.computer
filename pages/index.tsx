import React from 'react';
import Layout from '../components/Layout';
import PageFooter from '../components/PageFooter';
import allCards, { cardsById } from '../lib/cards';
import { Image, Box, Text, Link, Heading, Flex, Card } from 'theme-ui';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

const url = `https://luthier.computer`;
const description = 'tech tarot deck';

const Index = () => {
  let selected = null;
  let cards = [];
  let headings = null;
  let data = cardsById['c-7'];
  cards.push(data);
  selected = data;
  const title = `${data.name} ✧ luthier.computer`;
  const previewImage = `http://luthier.computer/rider-waite/${selected.id}.png`;

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
                <a href="http://luthiercomputer.gumroad.com">
                  <Card variant={`card_foil`}>
                    <Image
                      src={`/rider-waite/${card.id}.png`}
                      sx={{ transform: card.reversed ? 'rotate(180deg);' : 'none' }}
                    />
                  </Card>
                </a>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <PageFooter />
      </Box>
    </Layout>
  );
};

export default Index;
