#!/bin/bash

set -e

if [ $# -lt 2 ]; then
  echo "Usage: ./scripts/create-blog-post.sh \"Post Title\" \"category\""
  echo "Example: ./scripts/create-blog-post.sh \"5 Spring Maintenance Tips\" \"Seasonal Maintenance\""
  exit 1
fi

TITLE="$1"
CATEGORY="$2"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-|-$//g')
DATE=$(date +%Y-%m-%d)
FILENAME="src/blogs/${SLUG}.md"

# Check if file already exists
if [ -f "$FILENAME" ]; then
  echo "Error: $FILENAME already exists"
  exit 1
fi

cat > "$FILENAME" <<EOF
---
title: "$TITLE"
date: "$DATE"
excerpt: ""
image: ""
category: "$CATEGORY"
readTime: "5 min read"
slug: "$SLUG"
author: "Mursen Team"
tags: []
---

# $TITLE

Your content here...

EOF

echo "Created: $FILENAME"
