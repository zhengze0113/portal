import request from "../utils/request";

// 云服务列表
export function getCloudServiceList(params) {
  return request({
    url: "/api/cloud/osms/v1/services",
    method: "get",
    params
  });
}

//获取服务目录
export function getCloudServiceCatalogs(params) {
  return request({
    url: "/api/cloud/osms/v1/catalogs",
    method: "get",
    params
  });
}
// 获取服务信息
export function getServiceCatalogsInfo(params) {
  return request({
    url: `/api/cloud/osms/v1/catalogs/${params}`,
    method: "get"
  });
}
//获取子服务目录
export function getCloudServiceCatalogsC(params) {
  return request({
    url: `/api/cloud/osms/v1/catalogs/${params}/children`,
    method: "get"
  });
}

//根据云服务id查云资源
export function getCloudServiceResources(params) {
  return request({
    url: "/api/cloud/osms/v1/resources",
    method: "get",
    params
  });
}

//云资源的下sku
export function getResourcesSku(params) {
  return request({
    url: "/api/cloud/osms/v1/skus",
    method: "get",
    params
  });
}

//获取资源sku信息

export function getResourcesSkuInfo(params) {
  return request({
    url: `/api/cloud/osms/v1/skus/${params}`,
    method: "get"
  });
}

//加入购物车
export function postCart(data) {
  return request({
    url: `/api/cloud/osms/v1/carts`,
    method: "post",
    data
  });
}

//创建订单
export function postOrders(data) {
  return request({
    url: `/api/cloud/osms/v1/orders`,
    method: "post",
    data
  });
}

//容量计价
export function getSpec(params) {
  return request({
    url: `/api/cloud/osms/v1/prices/${params}`,
    method: "get"
  });
}

// ----------------  云服务目录API Start   ------------------------------

// 云服务目录列表
export function getcloudServiceCatalogList(params) {
  return request({
    url: "/api/cloud/osms/v1/catalogs",
    method: "get",
    params
  });
}

//获取服务目录子目录信息
export function getServiceSubdirectoryMessage(params) {
  return request({
    url: `/api/cloud/osms/v1/catalogs/${params}/children`,
    method: "get"
  });
}

//test
export function test(data) {
  return request({
    url: "/api/cloud/cmss/v1/application",
    method: "post",
    data
  });
}

//获取集群
export function getClusters() {
  return request({
    url: "/api/cloud/cmss/v1/clusters",
    method: "get"
  });
}
// 获取项目信息
export function getProject() {
  return request({
    url: "/api/cloud/iams/v1/projects",
    method: "get"
  });
}
//容器部署
export function rongqibushu(data) {
  return request({
    url: "/api/cloud/cmss/v1/deploymentconfig",
    method: "post",
    data
  });
}

//获取service
export function getService(params) {
  return request({
    url: `/api/cloud/cmss/v1/pass/services`,
    method: "get",
    params
  });
}

//创建服务路由
export function createServiceRout(data) {
  return request({
    url: "/api/cloud/cmss/v1/route",
    method: "post",
    data
  });
}

//创建数据存储PV
export function createDataPV(data) {
  return request({
    url: "/api/cloud/cmss/v1/pv",
    method: "post",
    data
  });
}

//注册中心
export function zhucezhongxin(envId, data, namespace) {
  return request({
    url: `/api/cloud/amcs/v1/clusters/${envId}/componentInstall/addComponentEureka`,
    method: "post",
    data,
    headers: { namespace: namespace }
  });
}
//熔断降级安装部署
export function fusingDrop(envId, data, namespace) {
  return request({
    url: `/api/cloud/amcs/v1/clusters/${envId}/componentInstall/addComponentDegrade`,
    method: "post",
    data,
    headers: { namespace: namespace }
  });
}
//熔断降级安装部署
export function monitoring(envId, data, namespace) {
  return request({
    url: `/api/cloud/amcs/v1/clusters/${envId}/componentInstall/addComponentTurbine`,
    method: "post",
    data,
    headers: { namespace: namespace }
  });
}

//分布式
export function createdistribution(envId, data, namespace) {
  return request({
    url: `/api/cloud/amcs/v1/clusters/${envId}/componentInstall/addComponentDtm`,
    method: "post",
    data,
    headers: { namespace: namespace }
  });
}

//网关管理
export function gatewayDrop(envId, data, namespace) {
  return request({
    url: `/api/cloud/amcs/v1/clusters/${envId}/componentInstall/addComponentGateway`,
    method: "post",
    data,
    headers: { namespace: namespace }
  });
}

//apm
export function pinpointDrop(envId, data, namespace) {
  return request({
    url: `/api/cloud/amcs/v1/clusters/${envId}/componentInstall/addPinpoint`,
    method: "post",
    data,
    headers: { namespace: namespace }
  });
}

//调用链服务
export function callChainApi(envId, data, namespace) {
  return request({
    url: `/api/cloud/amcs/v1/clusters/${envId}/componentInstall/addComponentTrace`,
    method: "post",
    data,
    headers: { namespace: namespace }
  });
}

//配置中心组件式安装部署
export function configurationCenterAPi(data, namespace) {
  return request({
    url: "/api/cloud/amcs/v1/clusters/1/componentInstall/assembly/deploy",
    method: "post",
    data,
    headers: { namespace: namespace }
  });
}

//是否安装注册中心
export function registration(envId, data, namespace) {
  return request({
    url: `/api/cloud/amcs/v1/clusters/${envId}/componentInstall/checkComponent?component=${data}`,
    method: "get",
    headers: { namespace: namespace }
  });
}

//一键安装微服务
export function installMicroservicesAPI(envId, data, namespace) {
  return request({
    url: `/api/cloud/amcs/v1/clusters/${envId}/componentInstall/addSpringcloud`,
    method: "post",
    data,
    headers: { namespace: namespace }
  });
}

//开通SonarQube
export function sonarQube(namespace, data) {
  return request({
    url: `/api/cloud/pdts/v1/${namespace}/sonar`,
    method: "post",
    data,
    type: "json"
  });
}

//开通gitlab
export function dredgeGitlabApi(namespace, data) {
  return request({
    url: `/api/cloud/pdts/v1/${namespace}/gitlab`,
    method: "post",
    data,
    type: "JSON"
  });
}

//开通Hitchhiker
export function hitchhiker(namespace, data) {
  return request({
    url: `/api/cloud/pdts/v1/${namespace}/hitchhikers`,
    method: "post",
    data,
    type: "json"
  });
}

//开通jenkins
export function jenkins(namespace, data) {
  return request({
    url: `/api/cloud/pdts/v1/${namespace}/jenkins`,
    method: "post",
    data,
    type: "json"
  });
}

//开通Nexus
export function createNexusApi(namespace, data) {
  return request({
    url: `/api/cloud/pdts/v1/${namespace}/nexus`,
    method: "post",
    data,
    type: "json"
  });
}

// var jira_url = "http://10.72.76.55:9000";
// var jira_admin = "admin";
// var jira_admin_password = "1qaz2wsx!@#";
//获取jira用户
export function jiraGetUserApi() {
  const pass = encodeURIComponent("kAUNkcQsTlG*V1d&");
  return request({
    url: `/api/cloud/pdts/v1/namespace/jira/users?jira_url=http://10.72.76.55:9000&jira_admin=admin&jira_admin_password=${pass}`,
    method: "get",
    type: "json"
  });
}

// 开通jira服务
export function createJiraApi(namespace, data) {
  return request({
    url: `/api/cloud/pdts/v1/${namespace}/jira`,
    method: "post",
    data,
    type: "json"
  });
}

// Jira 服务目录创建参数校验
export function jiraParameterCalibrationApi(namespace, data) {
  return request({
    url: `/api/cloud/pdts/v1/${namespace}/jira/params-check`,
    method: "post",
    data,
    type: "json"
  });
}

// 验证项目管理下是否有该人员
export function whetherExistPersonnel() {
  return request({
    url: "/api/cloud/iams/v1/projects",
    method: "get"
  });
}

// 验证资源空间别名是否重复  /kubernetes/{kubernetes_urn}/resource/space/name/check
export function aliasWhetherRepeat(kubernetes_urn, name) {
  return request({
    url:
      `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/resource/space/name/check?name=` +
      name,
    method: "get"
  });
}
// 查询项目列表
export function getProjects(params) {
  return request({
    url: "/api/cloud/iams/v1/projects",
    method: "get"
  });
}

// 获取项目下的资源空间
export function getProjectResource(params) {
  return request({
    url: `/api/cloud/cmss/v1/namespaces`,
    method: "get",
    params
  });
}

// 根据资源空间查询 configMap 列表
export function getConfigMaps(projectNo, kubernete_url, namespace) {
  return request({
    url: `/api/cloud/cmss/v1/project/${projectNo}/kubernetes/${kubernete_url}/namespace/${namespace}/application/configMaps`,
    method: "get"
  });
}

// 根据资源空间查询 Secret 列表
export function getSecrets(projectNo, kubernete_url, namespace) {
  return request({
    url: `/api/cloud/cmss/v1/project/${projectNo}/kubernetes/${kubernete_url}/namespace/${namespace}/application/secrets`,
    method: "get"
  });
}

// 查询OCP内部镜像仓库下的ImageStreams列表
export function getimagestreams(kubernetes_urn, namespace, params) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/namespaces/${namespace}/imagestreams`,
    method: "get",
    params
  });
}
//创建持久化存储卷(PVC)信息成功
export function createPersistentVolumeClaim(
  projectNo,
  kubernetes_urn,
  namespace,
  data
) {
  return request({
    url: `/api/cloud/cmss/v1/project/${projectNo}/kubernetes/${kubernetes_urn}/namespace/${namespace}/persistentVolumeClaim`,
    method: "post",
    data
  });
}
//查询sc列表
export function gerStrogeclass(kubernetes_urn) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/persistentVolume/strogeclass`,
    method: "get"
  });
}

// 查询存储卷声明（PVC）列表
export function gerPersistentVolumeClaims(
  projectNo,
  kubernetes_urn,
  namespace
) {
  return request({
    url: `/api/cloud/cmss/v1/project/${projectNo}/kubernetes/${kubernetes_urn}/namespace/${namespace}/persistentVolumeClaims`,
    method: "get"
  });
}

// 应用创建名称唯一性校验
export function checkApplication(name) {
  return request({
    url: `/api/cloud/cmss/v1/application/name/check?name=` + name,
    method: "get"
  });
}
// 查询ImageStream下某一版本的image详情
export function getImageStreamTagName(
  kubernetes_urn,
  namespace,
  imageStreamTagName
) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/namespaces/${namespace}/imagestreamtags/${imageStreamTagName}`,
    method: "get"
  });
}
// 查询ImageStream下某一版本的image详情
export function getImageMessage(
  kubernetes_urn,
  params
) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/image`,
    method: "get",
    params
  });
}
// 查询router下services
export function getRouterServices(project, kubernetesUrn, namespace) {
  return request({
    url: `/api/cloud/cmss/v1/project/${project}/kubernetes/${kubernetesUrn}/namespace/${namespace}/router/services`,
    method: "get"
  });
}

export function getServicesDetails(kubernetesUrn, namespace, name) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetesUrn}/namespace/${namespace}/service/${name}`,
    method: "get"
  });
}
export function getRouteUpload(kubernetesUrn, namespace) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetesUrn}/namespace/${namespace}/route/upload`,
    method: "post"
  });
}
//获取资源空间剩余可用资源
export function getResourceSpaceNameInfo(kubernetes_urn, name) {
  return request({
    url:
      `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/resource/space/name/info?name=` +
      name,
    method: "get"
  });
}

//资源对象pvc名称唯一性校验
export function persistentVolumeClaimCheck(kubernetes_urn, namespace, name) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/namespace/${namespace}/persistentVolumeClaim/name/${name}/check`,
    method: "get"
  });
}

//查询ocp外部仓库下的镜像列表
export function getOcpExternalImages(kubernetes_urn, params) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/images`,
    method: "get",
    params
  });
}
export function getOcpExternalImagesitems(kubernetes_urn, name, tag) {
  return request({
    url:
      `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/image?name=` +
      name +
      "&tag=" +
      tag,
    method: "get"
  });
}
//验证 pinpoint
export function verificationPinpointService(kubernetes_urn, namespace) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/namespace/${namespace}/pinpoint/pinpoint-service`,
    method: "get"
  });
}
//获取 opensshift  模板
export function getOpenshiftTemplate(kubernetes_urn) {
  return request({
    url: `/api/cloud/cmss/v1/kubernetes/${kubernetes_urn}/namespace/openshift/template/mysql-persistent`,
    method: "get"
  });
}

//查询当前的mysql名称是否已经存在
export function validityMysqlName(
  projectNo,
  kubernete_url,
  namespace,
  mysqlName
) {
  return request({
    url: `/api/cloud/cmss/v1/project/${projectNo}/kubernetes/${kubernete_url}/namespace/${namespace}/mysql/${mysqlName}`,
    method: "get"
  });
}
