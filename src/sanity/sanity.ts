import { apiVersion, dataset, projectId } from "@/sanity/env";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const clientOption = {
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion, // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
  token: process.env.SANITY_SECRET_TOKEN, // Needed for certain operations like updating content, accessing drafts or using draft perspectives
};

export const client = createClient({
  ...clientOption,
  useCdn: false, // set to `false` to bypass the edge cache
});

export const freshClient = createClient({
  ...clientOption,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
  return builder
    .image(source || "")
    .width(800)
    .url();
};
