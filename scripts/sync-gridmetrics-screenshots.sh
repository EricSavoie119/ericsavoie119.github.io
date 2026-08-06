#!/bin/sh
set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
site_root=$(dirname "$script_dir")
source_dir="$site_root/../GridMetrics/AppStore/Screenshots/source-20260806"
destination_dir="$site_root/public/assets/images/apps/GridMetrics/product"

command -v magick >/dev/null 2>&1 || {
  echo "ImageMagick is required: brew install imagemagick" >&2
  exit 1
}

mkdir -p "$destination_dir"

for mapping in \
  'forecast-top-latest.png:forecast-top.webp' \
  'forecast-tariff-latest.png:forecast-tariff.webp' \
  'forecast-detail-latest.png:forecast-detail.webp' \
  'FA117BD1-6284-44B5-93BA-C00444BAE053.png:fuel-mix.webp'
do
  source_name=${mapping%%:*}
  destination_name=${mapping#*:}
  source_file="$source_dir/$source_name"
  [ -f "$source_file" ] || {
    echo "Missing clean product capture: $source_file" >&2
    exit 1
  }
  magick "$source_file" -resize '900x>' -quality 88 "$destination_dir/$destination_name"
done

echo "Synced clean GridMetrics product captures into the website."
