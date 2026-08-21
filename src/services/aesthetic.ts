import { apiFetch } from "../lib/apiClient";
import {
  mapAestheticPhotoToCreatePayload,
  mapApiAestheticPhoto,
} from "../mappers/MapApiToAestheticPhoto";
import type { AestheticPhoto } from "../types/aestheticPhoto";
import type { ApiAestheticPhoto } from "../types/api/apiAestheticPhoto";

export async function createAestheticPhoto(
  bookId: string,
  photo: { imageUrl: string; caption?: string; order?: number },
): Promise<AestheticPhoto> {
  const apiPhoto = await apiFetch<ApiAestheticPhoto>(
    `/books/${bookId}/aesthetic_photos/create/`,
    {
      method: "POST",
      body: mapAestheticPhotoToCreatePayload(bookId, photo),
    },
  );
  return mapApiAestheticPhoto(apiPhoto);
}
