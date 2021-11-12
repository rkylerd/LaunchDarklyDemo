import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { api } from '../config'
import { FlagSet } from '../hooks'
import styles from '../styles/Home.module.css'
import getFeatureFlags from '../utils/feature-flags'
import axios from 'axios'
import SongList from '../components/SongList'
import { SoundPlayerProvider } from '../contexts/soundPlayer'
import { FormEvent, useEffect, useState } from 'react'
import { Song } from '../types/song'

type HomePageProps = {
  flags: FlagSet;
};

const search = async (searchTerm = "") =>
  await axios.get(`api/itunes/songs/${encodeURIComponent(searchTerm.replace(/\s/g, "+"))}`);

const HeadData = (
  <Head>
    <title>LaunchDarkly iTunes Demo</title>
    <meta name="Launch Darkly Demo" content="Launch Darkly Demo" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

const Home: NextPage<HomePageProps> = ({ flags }) => {
  const [searchResults, setResults] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const url = new URL(window.location.toString());
    const query = url.searchParams.get("q");
    if (query) {
      (async () => await updateSearchResults(null, query))();
      setSearchTerm(query);
    }
  }, []);

  const updateSearchResults = async (e: FormEvent | null, overrideSearchTerm = '') => {
    e?.preventDefault();
    const query = searchTerm || overrideSearchTerm;
    if (!query) return;
    setLoading(true);
    try {
      const url = new URL(window.location.toString());
      url.searchParams.set("q", query);
      window.history.pushState({}, '', url);

      const { data: { results = [] } } = await search(query);
      setResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className={styles.container}>
      {HeadData}

      <h1>{searchTerm.replace(/\b[a-z]/gi, (match) => match.toUpperCase())} Search Results</h1>
      <form onSubmit={updateSearchResults}>
        <input value={searchTerm} onChange={({ currentTarget: { value } }) => setSearchTerm(value)} />
        <button type="submit">Search</button>
      </form>

      <SoundPlayerProvider>
        {loading ? <h4>loading...</h4> :
          <SongList songs={searchResults} flags={flags} />
        }
      </SoundPlayerProvider>

    </div>
  )
}

export default Home;

export async function getServerSideProps(_context: NextPageContext) {
  try {
    const flags = await getFeatureFlags();
    return {
      props: { flags },
    }
  } catch (err) {
    return { flags: {} };
  }
}
