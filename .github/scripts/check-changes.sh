#!/bin/bash

# Check if there are any changes in the git working directory
if git diff --quiet && git diff --cached --quiet; then
  echo "has_changes=false" >> $GITHUB_OUTPUT
  echo "No changes detected"
  exit 0
else
  echo "has_changes=true" >> $GITHUB_OUTPUT
  echo "Changes detected:"
  git diff --stat
  git diff --cached --stat
  exit 0
fi