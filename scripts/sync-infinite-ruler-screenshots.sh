#!/bin/sh
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
site_root=$(dirname "$script_dir")
run_name=${INFINITE_RULER_SCREENSHOT_RUN:-listing-refresh-20260807}
source_dir="$site_root/../InfiniteRuler/artifacts/app-store-screenshots/$run_name/captured/en-GB"
destination_dir="$site_root/public/assets/images/apps/infiniteruler/product"

command -v magick >/dev/null 2>&1 || {
  echo "ImageMagick is required: brew install imagemagick" >&2
  exit 1
}

mkdir -p "$destination_dir"

for mapping in \
  'iPhone 17 Pro Max-03-precision.png:precision.webp' \
  'iPhone 17 Pro Max-04-movable-zero.png:movable-zero.webp' \
  'iPhone 17 Pro Max-05-infinite.png:infinite.webp' \
  'iPhone 17 Pro Max-06-calibration.png:calibration.webp' \
  'iPhone 17 Pro Max-07-right-edge.png:right-edge.webp'
do
  source_name=${mapping%%:*}
  destination_name=${mapping#*:}
  source_file="$source_dir/$source_name"
  [ -f "$source_file" ] || {
    echo "Missing clean Infinite Ruler capture: $source_file" >&2
    exit 1
  }
  magick "$source_file" -resize '900x>' -quality 88 "$destination_dir/$destination_name"
done

echo "Synced clean Infinite Ruler product captures into the website."
