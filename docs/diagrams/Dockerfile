FROM node:22.19-alpine3.22 as base

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_DOWNLOAD="true" \
    PUPPETEER_CONFIG_FILE="/app/puppeteer-config.json"

WORKDIR /app

# Add Depenedencies (Chromium and required fonts)
RUN apk add chromium font-noto-cjk font-noto-emoji \
    terminus-font ttf-dejavu ttf-freefont ttf-font-awesome \
    ttf-inconsolata ttf-linux-libertine \
    && fc-cache -f

COPY puppeteer-confg.json  /app/puppeteer-config.json

FROM base


COPY package.json yarn.lock ./
RUN yarn install

CMD ["yarn", "generate"]