#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PARENT_DIR="$(cd ${SCRIPT_DIR} && cd ../ && pwd)"
echo "Updating file: ${PARENT_DIR}/Resource/en.lproj/Localizable.strings"
python3 ${SCRIPT_DIR}/updateLocalization.py D > $PARENT_DIR/Resource/en.lproj/Localizable.strings
echo "Updating file: ${PARENT_DIR}/Resource/ja.lproj/Localizable.strings"
python3 ${SCRIPT_DIR}/updateLocalization.py E > $PARENT_DIR/Resource/ja.lproj/Localizable.strings
echo "Updating file: ${PARENT_DIR}/Resource/zh-Hant.lproj/Localizable.strings"
python3 ${SCRIPT_DIR}/updateLocalization.py F > $PARENT_DIR/Resource/zh-Hant.lproj/Localizable.strings
echo "Completed! 😎"
