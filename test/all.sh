#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function all_tests () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFFILE="$(readlink -m -- "$BASH_SOURCE")"
  local SELFPATH="$(dirname -- "$SELFFILE")"
  cd -- "$SELFPATH" || return $?
  exec </dev/null

  local TEST_FUNCS=()
  readarray -t TEST_FUNCS < <(
    grep -oPe '^function test_\w+' -- "$SELFFILE" | cut -d ' ' -sf 2-)
  local FUNC=
  for FUNC in "${TEST_FUNCS[@]}"; do
    "$FUNC" || return $?$(echo "E: $FUNC failed: rv=$?" >&2)
  done
}


function test_node_tests () { nodejs node_tests.js; }










all_tests "$@"; exit $?
