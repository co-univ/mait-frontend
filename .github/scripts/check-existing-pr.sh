#!/bin/bash
set -e

BRANCH_NAME="chore/update-api-spec"

# Check for existing PR
PR_NUMBER=$(gh pr list --head "$BRANCH_NAME" --state open --json number --jq '.[0].number')

if [ -n "$PR_NUMBER" ]; then
  echo "exists=true" >> $GITHUB_OUTPUT
  echo "number=$PR_NUMBER" >> $GITHUB_OUTPUT
  
  # Get existing PR body
  EXISTING_BODY=$(gh pr view "$PR_NUMBER" --json body --jq '.body')
  echo "body<<EOF" >> $GITHUB_OUTPUT
  echo "$EXISTING_BODY" >> $GITHUB_OUTPUT
  echo "EOF" >> $GITHUB_OUTPUT
  
  echo "Found existing PR #$PR_NUMBER"
else
  echo "exists=false" >> $GITHUB_OUTPUT
  echo "No existing PR found"
fi