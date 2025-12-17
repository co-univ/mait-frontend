#!/bin/bash
set -e

BACKEND_SHA=$1

if [ -z "$BACKEND_SHA" ]; then
  echo "Error: Backend SHA is required"
  exit 1
fi

# Update API spec files
echo "Updated at: $(TZ='Asia/Seoul' date)" > test-file.txt
echo "Backend commit: $BACKEND_SHA" >> test-file.txt

echo "Updated spec files with backend commit: $BACKEND_SHA"