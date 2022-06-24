const urlImage = import.meta.env.PUBLIC_FIREBASE_STORAGE_IMAGE
export const getImageUrl = (image?: string): string => {
    return urlImage + image + '?alt=media'
}
