import type { AestheticPhoto } from "../types/aestheticPhoto";
import type {
  ApiAestheticPhoto,
  ApiAestheticPhotoCreatePayload,
} from "../types/api/apiAestheticPhoto";

export function mapApiAestheticPhoto(photo: ApiAestheticPhoto): AestheticPhoto {
  return {
    id: String(photo.id),
    bookId: String(photo.book),
    imageUrl: photo.image_url,
    caption: photo.caption || undefined,
  };
}

export function mapAestheticPhotoToCreatePayload(
  bookId: string,
  photo: { imageUrl: string; caption?: string; order?: number },
): ApiAestheticPhotoCreatePayload {
  return {
    book: Number(bookId),
    image_url: photo.imageUrl,
    caption: photo.caption ?? "",
    order: photo.order ?? 0,
  };
}
