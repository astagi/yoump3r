#!/bin/bash

py.test --cov-report term-missing --cov=.
gulp test
gulp protractor