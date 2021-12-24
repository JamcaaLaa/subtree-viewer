#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

git add dist -f
git commit -m "[deploy] deploy."
git subtree push --prefix=dist origin gh-pages

cd -