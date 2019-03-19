# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs

PATH=$PATH:$HOME/.local/bin:$HOME/bin

export PATH

###### Modified by osamu at H3.13.19
#source $HOME/.git-completion.bash ←TI think this line is not necessary
source $HOME/.git-prompt.sh

#cf:https://qiita.com/varmil/items/9b0aeafa85975474e9b6
# プロンプトに各種情報を表示
GIT_PS1_SHOWDIRTYSTATE=1
GIT_PS1_SHOWUPSTREAM=1
GIT_PS1_SHOWUNTRACKEDFILES=
GIT_PS1_SHOWSTASHSTATE=1

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
export PS1='\[\033[1;32m\]\u\[\033[00m\]:\[\033[1;34m\]\w\[\033[1;31m\]$(__git_ps1)\[\033[00m\] \$ '
