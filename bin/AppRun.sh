#!/bin/bash

# 実行時に指定された引数の数、つまり変数 $# の値が 3 でなければエラー終了。
if [ $# -gt 0 ]; then
  echo "何かしらの引数が設定されたので、引数を起動します。"
  echo 【node $1】で起動
  node $1
  exit 0
fi

echo "引数が無かったので、app.jsを起動"
echo 【node app.js】で起動
node app.js
exit 0
