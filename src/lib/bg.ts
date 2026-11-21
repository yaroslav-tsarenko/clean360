import { getImageProps, type StaticImageData } from "next/image";

/**
 * Оптимізований CSS-фон через next/image (AVIF/WebP, ресайз) — для блоків,
 * де зображення має поводитися саме як background (позиціювання, size: auto 100% тощо).
 */
export function bgImage(src: StaticImageData, width: number, quality = 75): string {
  const { props } = getImageProps({ src, alt: "", width, height: Math.round((src.height / src.width) * width), quality });
  const set = (props.srcSet ?? "")
    .split(", ")
    .filter(Boolean)
    .map((entry) => {
      const [url, density] = entry.split(" ");
      return `url("${url}") ${density}`;
    })
    .join(", ");
  return set ? `image-set(${set})` : `url("${props.src}")`;
}
