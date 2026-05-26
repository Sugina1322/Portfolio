type StaticAsset = {
  src: string;
};

export function assetSrc(asset: string | StaticAsset) {
  return typeof asset === 'string' ? asset : asset.src;
}
