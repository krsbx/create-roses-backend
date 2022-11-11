export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export const IMAGE_EXTENSION = ['jpg', 'jpeg', 'png'] as const;

export const AUDIO_EXTENSION = ['mp3', 'wav'] as const;

export const VIDEO_EXTENSION = ['mp4', 'avi'] as const;

export const EXSTENSION = {
  IMAGE: IMAGE_EXTENSION,
  AUDIO: AUDIO_EXTENSION,
  VIDEO: VIDEO_EXTENSION,
} as const;
