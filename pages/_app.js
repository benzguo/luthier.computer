import { Provider } from 'next-auth/client';
import { ThemeProvider, Badge, Card, Styled, Flex, Box, Link } from 'theme-ui';
import Head from 'next/head';
import theme from '../theme';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/Layout';
import PageFooter from '../components/PageFooter';
import '../styles.css';
import React from 'react';
import { DefaultSeo, NextSeo } from 'next-seo';

const title = 'tarot express ✧ free online tarot reading';
const twitter = '@fastTarot';

// Markdown pages use this
const components = {
  wrapper: (props) => (
    <div style={{}}>
      <NextSeo
        title={title}
        description="FAQ, terms of service, privacy policy, etc"
        openGraph={{
          url: 'https://witchcraft.computer',
          title: title,
          description: 'FAQ, terms of service, privacy policy, etc',
          images: [
            {
              url: 'https://witchcraft.computer/tray-512.png',
              width: 512,
              height: 512,
              alt: title,
            },
          ],
          site_name: 'tarot express',
        }}
        twitter={{
          handle: twitter,
          site: twitter,
          cardType: 'summary_large_image',
        }}
      />
      <Layout>
        <Card variant="card_info" sx={{ px: 3, my: 2, cursor: 'auto' }}>
          <Flex></Flex>
          <main {...props} />
        </Card>
      </Layout>
      <Box mb={3} />
      <PageFooter />
    </div>
  ),
};

// Normal pages use this
const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Styled.root>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/favicon.png" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/roboto-slab.min.css" />
          </Head>
          <DefaultSeo
            title="tarot express"
            description="free online tarot reading"
            openGraph={{
              url: 'https://witchcraft.computer',
              title: 'tray',
              description: 'free online tarot reading',
              images: [
                {
                  url: 'https://witchcraft.computer/icon-512.png',
                  width: 512,
                  height: 512,
                  alt: 'tarot express',
                },
              ],
              site_name: 'tarotExpress',
            }}
            twitter={{
              handle: '@fastTarot',
              site: '@fastTarot',
              cardType: 'summary_large_image',
            }}
          />
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Styled.root>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
