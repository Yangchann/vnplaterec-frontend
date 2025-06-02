#!/bin/sh

echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" > .env.production
exec node server.js
