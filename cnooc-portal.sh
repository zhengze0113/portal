#!/bin/bash
#拉取最新代码
git pull
#编译源码
npm run build
#构建镜像
#docker build -t registry.cn-hangzhou.aliyuncs.com/multifort/cnooc-console:latest .
docker build -t cnooc-portal:2.0 .
#推送到镜像仓库
#docker push registry.cn-hangzhou.aliyuncs.com/multifort/cnooc-console:latest
