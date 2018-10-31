###########################################################
# Should be executed in project root, not in test folder. #
###########################################################

# Setting some colores, because everyone likes colors.
BLUE='\033[0;34m'
GREEN='\033[1;32m'
R='\033[0m'

echo "${BLUE}Prepair test suite ...${R}"

# Installing all dependencies (including dev dependencies)
npm install --save-dev

# Clean work space
npm run clean

# Compile TypeScript to JavaScript and build CSS
tsc
npm run build-css

# Have to rebuild (rb) some packages, so they can run without Electron.
npm rb better-sqlite3 --update-binary
npm rb bcrypt --update-binary
npm rb integer --update-binary

echo "${GREEN}Running test suite ...${R}\n"

# Run test suite
node tests/user.js

echo "\n${BLUE}Done, hopefully everything worked. Revert changes ..."

# After tests are finished, revert, so you can execute TypeOS with Electron.
npm rm bcrypt
npm install bcrypt
$(npm bin)/electron-rebuild