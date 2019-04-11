#!/bin/bash

if [ $# -gt 0 ]; then
  echo "何かしらの引数が設定されたので、引数を起動します。"
  echo 【node $1】で起動
  node $1
  exit 0
fi

echo "引数が無かったので、【node sever.js】を実行"
node server.js
exit 0
