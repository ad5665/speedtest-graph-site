#!/bin/bash
## SpeedTest++ - https://github.com/taganaka/SpeedTest.git

~/SpeedTest/SpeedTest --output text | awk -F "=" '/TEST_SERVER_HOST=/{print $NF} /LATENCY=/{print $NF} /JITTER=/{print $NF} /DOWNLOAD_SPEED=/{print $NF} /UPLOAD_SPEED=/{print $NF}' > /tmp/lastSpeedtestRun.txt

date +%Y%m%d%H%M%S >> /tmp/lastSpeedtestRun.txt

cat /tmp/lastSpeedtestRun.txt | awk '{if(NF){gsub(/^ |,$/,""); printf c $0; c=","}else{printf "\n"; c=""}};END{printf "\n"}' >> /tmp/tests.csv

yes | cp -rf /tmp/tests.csv /tmp/graphs-from-csv/data/tests.csv

sudo cp -rf /tmp/tests.csv /var/www/html/speedtest/public_html/data/tests.csv
