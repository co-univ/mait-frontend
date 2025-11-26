#!/bin/bash
set -e

# Generate timestamps in Seoul timezone
DATE=$(TZ='Asia/Seoul' date +%Y.%m.%d)
TIME=$(TZ='Asia/Seoul' date +%H:%M)

# Output to GitHub Actions
echo "date=$DATE" >> $GITHUB_OUTPUT
echo "time=$TIME" >> $GITHUB_OUTPUT

# Debug: Print generated timestamp
# Date format : YYYY.MM.DD, Time format : HH:MM
echo "Generated timestamp: $DATE $TIME"