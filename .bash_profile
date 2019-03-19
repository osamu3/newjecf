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

# show git branch gitのブランチを表示する。 cf:https://qiita.com/hmmrjn/items/60d2a64c9e5bf7c0fe60
# https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh

export PS1='\W/\u:\[\e[1;32m$(__git_ps1 "%s")\[\e[0m\]\$ '
