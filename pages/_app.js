import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { Fragment } from 'react' // Fixed import statement for Fragment

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  )
}

export default MyApp