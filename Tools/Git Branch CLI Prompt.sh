# simple script to add the name and clean/dirty status of your current git branch to your command prompt

LIGHT_GRAY="\[\033[0;37m\]"; BLUE="\[\033[1;36m\]"; RED="\[\033[0;31m\]"; LIGHT_RED="\[\033[1;31m\]";
GREEN="\[\033[0;32m\]"; WHITE="\[\033[1;37m\]"; LIGHT_GRAY="\[\033[0;37m\]"; YELLOW="\[\033[1;33m\]";

function parse_git_branch {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ \(\1\)/';
}

function parse_git_status {
  git status 2> /dev/null | grep "working directory clean" | wc -l;
}

function check_git_changes {
  # tput setaf 1 = RED, tput setaf 2 = GREEN
  [ `parse_git_status` -ne 1 ] && tput setaf 1 || tput setaf 2
}

export PS1="$YELLOW\w\[\$(check_git_changes)\]\$(parse_git_branch)$LIGHT_GRAY $ "
