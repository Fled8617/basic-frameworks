import React from 'react'
import App from 'next/app'
import Head from 'next/head';
import Router from 'next/router';

Router.events.on('routeChangeComplete', () => {
  if (process.env.NODE_ENV !== 'production') {
    let elems = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]',
    );
    let timestamp = new Date().valueOf();
    // @ts-ignore
    elems[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
  }
});
class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
