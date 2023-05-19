#!/bin/bash

# Chạy lệnh yarn build
yarn build

# Kiểm tra xem lệnh yarn build đã thành công chưa
if [ $? -eq 0 ]; then
  echo "build project done ----------->"
else
  echo "build error ----->"
  exit 1
fi

# Chạy lệnh pm2 restart badmk
pm2 restart badmk

# Kiểm tra xem lệnh pm2 restart đã thành công chưa
if [ $? -eq 0 ]; then
  echo "restart done ----------->"
else
  echo "restart error ----------->"
  exit 1
fi

echo "Done"
