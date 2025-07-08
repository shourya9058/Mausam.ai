#!/bin/bash
# Exit on error
set -e

# Install dependencies
npm ci

# Build the app
npm run build

# The build output is in the 'dist' directory
echo "Build completed successfully. Files in dist/:"
ls -la dist/
