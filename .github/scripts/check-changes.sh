#!/bin/bash
set -e

TARGET_PATH="src/libs/types/"

# Check if there are any changes in src/libs/types/
if git diff --quiet -- "$TARGET_PATH" && git diff --cached --quiet -- "$TARGET_PATH"; then
  echo "has_changes=false" >> $GITHUB_OUTPUT
  echo "No changes detected in $TARGET_PATH"
  exit 0
else
  echo "has_changes=true" >> $GITHUB_OUTPUT
  echo "Changes detected in $TARGET_PATH:"
  git diff --stat -- "$TARGET_PATH"
  git diff --cached --stat -- "$TARGET_PATH"
  exit 0
fi