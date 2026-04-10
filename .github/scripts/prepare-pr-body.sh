#!/bin/bash
set -e

if [ -z "$SHORT_SHA" ] || [ -z "$FULL_SHA" ] || [ -z "$COMMIT_MESSAGE" ] || [ -z "$DATE" ] || [ -z "$TIME" ]; then
  echo "Error: Required parameters missing"
  echo "SHORT_SHA: '$SHORT_SHA'"
  echo "FULL_SHA: '$FULL_SHA'"
  echo "COMMIT_MESSAGE: '$COMMIT_MESSAGE'"
  echo "DATE: '$DATE'"
  echo "TIME: '$TIME'"
  exit 1
fi

# Debug: Print variables
echo "Debug - Repository: $REPOSITORY"
echo "Debug - Full SHA: $FULL_SHA"
echo "Debug - Short SHA: $SHORT_SHA"
echo "Debug - Commit Message: $COMMIT_MESSAGE"

REPO_URL="https://github.com/$REPOSITORY"
echo "Debug - Constructed REPO_URL: $REPO_URL"

# Create backend commit line in markdown format: {message}(sha) - {date} {time}
BACKEND_COMMIT_LINE="- $(printf '%s' "$COMMIT_MESSAGE") ([\`$SHORT_SHA\`]($REPO_URL/commit/$FULL_SHA)) - $DATE $TIME"

if [ "$PR_EXISTS" == "true" ]; then
  # Check if commit already exists (check both full and short SHA)
  if echo "$EXISTING_BODY" | grep -qE "$FULL_SHA|$SHORT_SHA"; then
    echo "Commit already exists in PR"
    NEW_BODY="$EXISTING_BODY"
  else
    # Check if Backend Commits section exists
    if echo "$EXISTING_BODY" | grep -q "## Backend Commits"; then
      # Add commit after Backend Commits header
      # Use ENVIRON instead of -v to safely handle special characters in commit line
      NEW_BODY=$(COMMIT_LINE="$BACKEND_COMMIT_LINE" echo "$EXISTING_BODY" | awk '
                /## Backend Commits/ { print; print ENVIRON["COMMIT_LINE"]; next }
                { print }
            ')
    else
      # Add Backend Commits section at the end
      NEW_BODY="$EXISTING_BODY

## Backend Commits
$BACKEND_COMMIT_LINE"
    fi
  fi
else
  # Create new PR body
  NEW_BODY="## API Spec Update
This PR was automatically created by the update-api-spec workflow.

## Backend Commits
$BACKEND_COMMIT_LINE"
fi

# Output to GitHub Actions
DELIM=$(openssl rand -hex 8)
echo "content<<$DELIM" >> $GITHUB_OUTPUT
echo "$NEW_BODY" >> $GITHUB_OUTPUT
echo "$DELIM" >> $GITHUB_OUTPUT

echo "PR body prepared successfully"