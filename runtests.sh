#!/bin/bash

function quit {
    killall python
    exit $1
}

python manage.py runserver --settings=yoump3r.settings_test &

sleep 1

py.test --cov-report term-missing --cov=. || quit 1
gulp test || quit 1
gulp protractor || quit 1

quit 0
