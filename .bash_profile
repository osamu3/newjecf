# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs

export PATH=$PATH:$HOME/.local/bin:$HOME/bin

#↓これはいらね。
#PATH=$PATH:/home/osm/node_modules/.bin

#突然パスが通らなくなったので、追加 H31.3.28
#export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:$PATH

#Node用Moduleライブライへのパスを追加 H31.3.26
#export PATH=/usr/local/share/npm/bin:$PATH
#export NODE_PATH=/usr/local/lib/node_modules

#export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/local/share/npm/bin:$PATH
#export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/local/share/npm/bin
export NODE_PATH=/usr/local/lib/node_modules

###### Modified by osamu at H3.13.19
#source $HOME/.git-completion.bash ←TI think this line is not necessary
source $HOME/.git-prompt.sh

#cf:https://qiita.com/varmil/items/9b0aeafa85975474e9b6
# プロンプトに各種情報を表示
GIT_PS1_SHOWDIRTYSTATE=true
#addされてない変更(unstaged)があったとき"*"を表示する、addされているがcommitされていない変更(staged)があったとき"+"を表示する。

GIT_PS1_SHOWUPSTREAM=true
#現在のブランチがupstreamより進んでいるとき">"を、遅れているとき"<"を、遅れてるけど独自の変更もあるとき"<>"を表示する。

GIT_PS1_SHOWUNTRACKEDFILES=true
#addされてない新規ファイルがある(untracked)とき"%"を表示する

GIT_PS1_SHOWSTASHSTATE=true
#stashになにか入っている(stashed)とき"$"を表示する。

GIT_PS1_SHOWCOLORHINTS=true
#表示内容のカラー化

############### ターミナルのコマンド受付状態の表示変更
# \u ユーザ名
# \h ホスト名
# \W カレントディレクトリ
# \w カレントディレクトリのパス
# \n 改行
# \d 日付
# \[ 表示させない文字列の開始
# \] 表示させない文字列の終了
# \$ $

# show git branch gitのブランチを表示する。 cf:https://qiita.com/hmmrjn/items/60d2a64c9e5bf7c0fe60
# https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh

#export PS1='\W/\u:\[\e[1;32m$(__git_ps1 "%s")\[\e[0m\]\$ '
export PS1='MP\[\033[1;34m\w\[\033[00m\]:\[\033[1;32m\]\u\[\033[1;31m\]$(__git_ps1)\[\033[00m\]\$ '
#export PS1='\[\033[1;32m\]\u\[\033[00m\]:\[\033[1;34m\]\w\[\033[1;31m\]$(__git_ps1)\[\033[00m\] \$ '
#Node.Jsのライブラリモジュールが呼び出せなくなった(command not found)ので追加した
