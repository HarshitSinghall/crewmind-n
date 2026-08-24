import { useState } from 'react'
import { Play } from 'lucide-react'
import type { HomeContent } from '@/content/types'

type Video = HomeContent['hero']['video']

/**
 * Honest video placeholder.
 *
 * The reference site's player ships `fakeBar: { active: true }` — a fake
 * loading bar designed to imply the video is already playing, plus a
 * "your video has already started" overlay. Both are dark patterns. This
 * shows a real poster, a real duration, and a real play control.
 *
 * Drop the embed in place of the `<div>` inside the `playing` branch.
 */
export function VideoSlot({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-[var(--r-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)] shadow-[var(--shadow-3)]">
      <div className="relative aspect-video w-full">
        {playing ? (
          <div className="flex h-full w-full items-center justify-center bg-[var(--surface-2)]">
            <p className="font-mono text-[0.8125rem] text-[var(--text-3)]">
              {/* TODO: replace with the real embed (iframe / <video>). */}
              Video embed goes here
            </p>
          </div>
        ) : (
          <>
            {video.poster ? (
              <img
                src={video.poster}
                alt=""
                width={1280}
                height={720}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="h-full w-full"
                style={{
                  background:
                    'radial-gradient(120% 100% at 50% 0%, var(--surface-3), var(--surface-1) 70%)',
                }}
              />
            )}

            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-4 transition-colors duration-[var(--dur-base)] hover:bg-[color-mix(in_oklch,var(--bg)_20%,transparent)]"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-[var(--r-full)] border border-[var(--border-strong)] bg-[color-mix(in_oklch,var(--bg)_70%,transparent)] backdrop-blur-md transition-transform duration-[var(--dur-base)] ease-[var(--ease-spring)] group-hover:scale-105">
                <Play
                  size={20}
                  className="ml-0.5 fill-[var(--text-1)] text-[var(--text-1)]"
                />
              </span>
              <span className="flex items-center gap-2.5">
                <span className="text-[0.9375rem] font-medium text-[var(--text-1)]">
                  {video.label}
                </span>
                <span className="tnum font-mono text-[0.75rem] text-[var(--text-3)]">
                  {video.duration}
                </span>
              </span>
              <span className="sr-only">Play video: {video.label}</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
