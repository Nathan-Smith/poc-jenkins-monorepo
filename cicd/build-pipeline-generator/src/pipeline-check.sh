#!/bin/bash

git diff --exit-code ../../Jenkinsfile

MODIFIED=$?

if [ $MODIFIED -ne 0 ]; then
  echo "Pipeline is out-of-date, to update the Jenkinsfile run:
$ make build-pipeline"
fi

exit $MODIFIED
