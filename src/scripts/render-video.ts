import { getCompositions, renderMedia } from '@remotion/renderer';
import path from 'path';
import { getFormattedDate } from "../lib/utils";

export async function renderVideo(): Promise<void> {
  const serveUrl = path.resolve(__dirname, '../../build');

  const comps = await getCompositions(serveUrl);
  const composition = comps.find((c) => c.id === 'fpl-video');

  if (!composition) {
    throw new Error('Composition with ID "fpl-video" not found');
  }

  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    outputLocation: `out/fpl-price-changes-${getFormattedDate()}.mp4`,
  });

  console.log('Video rendered!');
}
