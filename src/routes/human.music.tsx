import { createFileRoute } from '@tanstack/react-router'
import { PageCard, PageHeader } from '../components/page'

export const Route = createFileRoute('/human/music')({
  component: HumanMusicPage,
})

function HumanMusicPage() {
  const palette = 'lightBronze' as const

  return (
    <>
      <PageHeader
        palette={palette}
        title="Music"
        description="A few playlists that say different things about me depending on the day. Some push the pulse up a bit, some are there for a different emotional requirement, and some belong strictly to soft starts."
      />
      <section className="grid gap-4">
        <PageCard palette={palette} title="woopwoop">
          <div className="space-y-4">
            <p>
              This one is mine. It has been around for a while, and I still keep
              adding to it. It is called woopwoop because it mostly sparks me
              and makes me want to dance just enough.
            </p>
            <iframe
              data-testid="embed-iframe"
              title="Sabine's woopwoop playlist on Spotify"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/2xVQjXK70wm3R5QQp08yFN?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </PageCard>
        <PageCard palette={palette} title="something else">
          <div className="space-y-4">
            <p>
              This next one is for when I need to feel, well, something else.
            </p>
            <iframe
              data-testid="embed-iframe"
              title="Sabine's something else playlist on Spotify"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/2D8FNlxKto3rg27SfH2jyW?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </PageCard>
        <PageCard palette={palette} title="slow mornings only">
          <div className="space-y-4">
            <p>
              This one is for when I wake up. It is cozy and never too dramatic.
              Weekends and slow mornings only.
            </p>
            <iframe
              data-testid="embed-iframe"
              title="Sabine's slow mornings only playlist on Spotify"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/3x1PZhAc1HjiTHG7MjcnTn?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </PageCard>
        <PageCard palette={palette} title="favorite artists">
          <ul className="space-y-4">
            <li>
              <a
                href="https://open.spotify.com/artist/7pXu47GoqSYRajmBCjxdD6?si=4f72ef43d4774a94"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline decoration-light_bronze-300/60 underline-offset-4 transition hover:text-tea_green-200"
              >
                Vulfpeck
              </a>
              <p className="mt-1">
                Minimalist American funk and soul with absurdly tight rhythm
                playing.
              </p>
            </li>
            <li>
              <a
                href="https://open.spotify.com/artist/74XFHRwlV6OrjEM0A2NCMF?si=4fa203d1a2634bb8"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline decoration-light_bronze-300/60 underline-offset-4 transition hover:text-tea_green-200"
              >
                Paramore
              </a>
              <p className="mt-1">
                Tennessee alternative rock that moves easily between pop-punk,
                emo, and sharper pop rock.
              </p>
            </li>
            <li>
              <a
                href="https://open.spotify.com/artist/73rPcaYEhBd0UuVZBqqyQJ?si=e2f1e5e7737e4f18"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline decoration-light_bronze-300/60 underline-offset-4 transition hover:text-tea_green-200"
              >
                The Happy Fits
              </a>
              <p className="mt-1">
                New Jersey indie rock with bright hooks and cello threaded into
                the band sound.
              </p>
            </li>
            <li>
              <a
                href="https://open.spotify.com/artist/4YlhxCoA1qEgTHoOBaKu1t?si=b9876ce063c24df0"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline decoration-light_bronze-300/60 underline-offset-4 transition hover:text-tea_green-200"
              >
                Magic Bronson
              </a>
              <p className="mt-1">
                Los Angeles indie-electronic duo making synth-heavy songs with
                anxious, playful energy.
              </p>
            </li>
            <li>
              <a
                href="https://open.spotify.com/artist/2Ex4vjQ6mSh5woTlDWto6d?si=TYq3jORsS4e2a0853eHgNQ"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline decoration-light_bronze-300/60 underline-offset-4 transition hover:text-tea_green-200"
              >
                Masayoshi Takanaka
              </a>
              <p className="mt-1">
                Virtuosic Japanese guitarist whose jazz fusion feels sunlit,
                playful, and technically ridiculous.
              </p>
            </li>
          </ul>
        </PageCard>
        <PageCard palette={palette} title="favorite songs">
          <div className="space-y-4">
            <p>A few tracks I keep coming back to.</p>
            <iframe
              data-testid="embed-iframe"
              title="Favorite song 1 on Spotify"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/track/4dsz9aUxhWmU0Qxil3znCu?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <iframe
              data-testid="embed-iframe"
              title="Favorite song 2 on Spotify"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/track/2jQqWeTGRRpLkUxWQEJx5s?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <iframe
              data-testid="embed-iframe"
              title="Favorite song 3 on Spotify"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/track/5NRtdsFFlmyE8qDMgS08PE?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <iframe
              data-testid="embed-iframe"
              title="Favorite song 4 on Spotify"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/track/4M8W158Br9lfPILb9D0VSe?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </PageCard>
      </section>
    </>
  )
}
