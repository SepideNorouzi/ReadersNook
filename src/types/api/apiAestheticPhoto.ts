export type ApiAestheticPhoto = {
  id: number;
  book: number;
  image_url: string;
  caption: string;
  order: number;
};

// POST /books/{id}/aesthetic_photos/create/
// `book` is required by the serializer even though the URL already has the id.
export type ApiAestheticPhotoCreatePayload = {
  book: number;
  image_url: string;
  caption: string;
  order: number;
};
