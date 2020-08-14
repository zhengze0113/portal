let root = process.env.NODE_ENV;
//开发环境
let baseURL = {
    // 数据接口
    DataInterfaceOams: "http://10.72.78.125:8082",
    DataInterfaceIams: "http://10.72.78.125:8081",
    LoginHref: "/html/login.html",
    // LoginHref:"http://localhost:8088/toFront",
    /**
     * 以下为容器启动需要配置参数
     */
    DataInterfaceUsms: "http://10.72.78.125:8083",
    DataInterfaceCmss: "http://10.72.78.125:8085",
    DataInterfaceAmcs: "http://10.72.78.125:8808",
    DataInterfacePdts: "http://10.72.78.125:18090",
    DataInterfaceConsole: "http://10.72.78.125:9527",
    DataInterface3scale: "http://10.72.78.125:8810",
    // cms路径
    DATAURL: "http://10.72.78.125:1337",
    // DomainName: ".apps.paas.cnooc",
    DomainName: "localhost",
    //测试提交
    /**
     * DATAURL|http://strapi:1337;
     * portalPath|http://121.37.230.252:8090/html;
     * devOpsPath|http://121.37.230.252:9529;
     * elasticearchPath|http://121.37.230.252:9530;
     * microservicePath|http://121.37.230.252:9528;
     * workbenchPath|http://121.37.230.252:9526
     */
};
/**
 * 以下代码本地启动需要注释掉
 */

// const arr = document.querySelector("html").dataset.promiseBaseUrl.split(";");
// arr.forEach(item => {
//     const path = item.split("|");
//     baseURL[path[0]] = path[1];
// });


//****************/
module.exports = baseURL;
console.log(baseURL);