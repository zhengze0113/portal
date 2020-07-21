echo "打包镜像"
docker build -t cnooc-portal:1.2 .
echo "运行portal"
docker save -o portal.tar cnooc-portal:1.2
echo "执行结束"
