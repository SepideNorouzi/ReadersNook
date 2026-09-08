import { apiFetch } from "../lib/apiClient";
import {
  mapAestheticPhotoToCreatePayload,
  mapApiAestheticPhoto,
} from "../mappers/MapApiToAestheticPhoto";
import type { AestheticPhoto } from "../types/aestheticPhoto";
import type { ApiAestheticPhoto } from "../types/api/apiAestheticPhoto";

export async function createAestheticPhoto(
  catalogBookId: string,
  photo: { imageUrl: string; caption?: string; order?: number },
): Promise<AestheticPhoto> {
  const apiPhoto = await apiFetch<ApiAestheticPhoto>(
    `/books/${catalogBookId}/aesthetic_photos/create/`,
    {
      method: "POST",
      body: mapAestheticPhotoToCreatePayload(catalogBookId, photo),
    },
  );
  return mapApiAestheticPhoto(apiPhoto);
}
