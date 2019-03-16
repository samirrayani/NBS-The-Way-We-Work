# @author Moshe Bildner <moshe@nextbigsound.com>
# @description a simple cli to serve files out of a directory.
# Useful for quick testing/exploration.
#
# @example
# 	serve on default port (8000)
# 	`$ pserve`
#
# 	serve on a custom port
# 	`$ pserve 5000`
#
# 	serve on a restricted port
# 	`$sudo pserve 80`

# start python simpleHTTPServer in current directory
function pserve {
  if [[ -z $1 ]]; then
    PYTHON_SERVER_PORT=8000
  else
    PYTHON_SERVER_PORT=$1
  fi

  python -m SimpleHTTPServer $PYTHON_SERVER_PORT
}
