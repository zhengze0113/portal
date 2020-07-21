import {
  test,
  rongqibushu,
  createServiceRout,
  createdistribution,
  zhucezhongxin,
  createDataPV,
  fusingDrop,
  monitoring,
  callChainApi,
  configurationCenterAPi,
  gatewayDrop,
  pinpointDrop,
  registration,
  installMicroservicesAPI,
  dredgeGitlabApi,
  sonarQube,
  hitchhiker,
  jenkins,
  createNexusApi,
  createJiraApi
} from "../api/serviceOperating";
import { postOrders } from "../api/shoplist";
import Vue from "vue";
const baseURL = require("../../../web/src/api/app");
let v = new Vue();
const paramsObj = [
  {
    requestModeParams: {
      protocol: "http",
      requestPath: "",
      httpMethod: "",
      ParamFormat: "json"
    },
    params: "",
    headers: ""
  }
];

//资源空间
export function createProject(monitoring, addorder, orderData) {
  var code = 0;
  var testObject = {
    description: "", //资源空间描述
    displayName: "", //资源空间名称
    cpu: "", //cpu
    memory: "", //内存
    memoryUnit: "Gi",
    storage: "", // 储存空间
    storageUnit: "Gi",
    name: "",
    envId: monitoring.envId,
    projectNo: monitoring.configure,
    purchase: "", // 时长
    purchaseQuantity: "1",
    unit: ""
  };
  console.log(testObject);
  var arr = JSON.parse(addorder.items[0].params);
  console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name.trim() == "资源空间名称") {
      testObject.name = arr[i].paramValue;
    }
    if (arr[i].name.trim() == "资源空间别名") {
      testObject.displayName = arr[i].paramValue;
    }
    if (arr[i].name.trim() == "资源空间描述") {
      testObject.description = arr[i].paramValue;
    }
    if (arr[i].name.trim() == "CPU") {
      // testObject.cpu = arr[i].paramValue + "C";
      testObject.cpu = arr[i].paramValue;
    }
    if (arr[i].name.trim() == "内存") {
      testObject.memory = arr[i].paramValue;
      // testObject.memory = arr[i].paramValue;
    }
    if (arr[i].name.trim() == "时长") {
      testObject.purchase = arr[i].paramValue;
    }
    if (arr[i].name.trim() == "存储空间") {
      testObject.storage = arr[i].paramValue;
      // testObject.storage = arr[i].paramValue;
    }
  }
  console.log(testObject);
  //服务请求信息
  let params = JSON.stringify(testObject);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceCmss + "/api/cloud/cmss/v1/resource/space";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // this.uid = res.content.sn;
  // if (res.code == 201) {
  //   this.$notify({
  //     type: "success",
  //     message: res.message
  //   });
  // } else {
  //   this.$notify({
  //     type: "error",
  //     message: res.message
  //   });
  // }
  // test(a).then(r => {
  //   console.log(r);
  //   if (r.code == 200) {
  //     code == 200;
  //     // this.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

// 容器部署
export function createContainer(deployment, list, orderData) {
  //服务请求信息
  console.log(deployment);

  let platformParams = [
    {
      requestModeParams: {
        protocol: "http",
        requestPath: "",
        httpMethod: "",
        ParamFormat: "json"
      },
      params: { deployment: {} },
      headers: ""
    }
  ];

  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceCmss +
    "/api/cloud/cmss/v1/project/" +
    deployment.projectNo +
    "/kubernetes/" +
    deployment.envId +
    "/namespace/" +
    deployment.namespace +
    "/image/application";

  platformParams[0].requestModeParams.httpMethod = "post";
  Vue.delete(deployment, "imageUrlLocation");
  Vue.delete(deployment, "envId");
  Vue.delete(deployment, "projectNo");

  // let params = JSON.stringify(deployment);
  platformParams[0].params.deployment = deployment;
  platformParams[0].headers = "";
  Vue.set(orderData, "orderResourceType", "APPLICATION");
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);

  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
}

// 服务路由
export function createServiceRoutT(form, list, orderData) {
  //服务请求信息
  console.log(form);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceCmss +
    "/api/cloud/cmss/v1/kubernetes/" +
    form.kubernetesUrn +
    "/namespace/" +
    form.namespace +
    "/route";
  platformParams[0].requestModeParams.httpMethod = "post";

  Vue.delete(form, "projectName");

  let params = JSON.stringify(form);
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });

  // var a = JSON.parse(JSON.stringify(serviceRoute));
  // createServiceRout(a).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  // return code;
}

// 分布式服务
export function createDistributed(list, orderData) {
  var code = 0;
  var a = JSON.parse(JSON.stringify(list));
  console.log(a);
  //服务请求信息
  let params = JSON.stringify(a);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceAmcs +
    "/api/cloud/amcs/v1/clusters/" +
    a.envId +
    "/componentInstall/addComponentDtm";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = JSON.stringify({ namespace: a.nameSpace });
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // createdistribution(a.envId, a, a.nameSpace).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}
// 熔断监控
export function fusingMonitoring(data, orderData) {
  var code = 0;
  var obj = JSON.parse(JSON.stringify(data));
  console.log(obj);
  //服务请求信息
  let params = JSON.stringify(obj);
  let platformParams = paramsObj;

  let twoparams = {
    requestModeParams: {
      protocol: "http",
      requestPath: "",
      httpMethod: "",
      ParamFormat: "json"
    },
    params: "",
    headers: ""
  };
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceAmcs +
    "/api/cloud/amcs/v1/clusters/" +
    obj.envId +
    "/componentInstall/addComponentDegrade";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = JSON.stringify({ namespace: obj.nameSpace });

  twoparams.requestModeParams.requestPath =
    baseURL.DataInterfaceAmcs +
    "/api/cloud/amcs/v1/clusters/" +
    obj.envId +
    "/componentInstall/addComponentTurbine";
  twoparams.requestModeParams.httpMethod = "post";
  twoparams.params = params;
  twoparams.headers = JSON.stringify({ namespace: obj.nameSpace });
  platformParams.push(twoparams);
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });

  // fusingDrop(obj.envId, obj, obj.nameSpace).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  // monitoring(obj.envId, obj, obj.nameSpace).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

// 数据存储PV
export function createDataPVT(pvcvolume, list, orderData) {
  //服务请求信息

  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceCmss +
    "/api/cloud/cmss/v1/project/" +
    pvcvolume.projectNo +
    "/kubernetes/" +
    pvcvolume.kubernetes_urn +
    "/namespace/" +
    pvcvolume.namespace +
    "/persistentVolumeClaim";
  platformParams[0].requestModeParams.httpMethod = "post";

  Vue.delete(pvcvolume, "kubernetes_urn");
  Vue.delete(pvcvolume, "namespace");
  Vue.delete(pvcvolume, "projectNo");
  let params = JSON.stringify(pvcvolume);
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  Vue.set(orderData, "orderResourceType", "APPLICATION");
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // var a = JSON.parse(JSON.stringify(dataPV));
  // createDataPV(a).then(r => {
  //   console.log(r);
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
}
// 网关服务
export function gateway(data, orderData) {
  var code = 0;
  var obj = JSON.parse(JSON.stringify(data));
  console.log(obj);
  //服务请求信息
  let params = JSON.stringify(obj);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceAmcs +
    "/api/cloud/amcs/v1/clusters/" +
    obj.envId +
    "/componentInstall/addComponentGateway";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = JSON.stringify({ namespace: obj.nameSpace });
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // gatewayDrop(obj.envId, obj, obj.nameSpace).then(r => {
  //   code = r.code;
  //   console.log(obj);
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

// Apm installMicroservicesAPI
export function pinpoint(data, orderData) {
  var code = 0;
  var obj = JSON.parse(JSON.stringify(data));
  console.log(obj);
  //服务请求信息
  let params = JSON.stringify(obj);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceAmcs +
    "/api/cloud/amcs/v1/clusters/" +
    obj.envId +
    "/componentInstall/addPinpoint";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = JSON.stringify({ namespace: obj.nameSpace });
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // pinpointDrop(obj.envId, obj, obj.nameSpace).then(r => {
  //   code = r.code;
  //   console.log(obj);
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

//注册中心
export function createzhucezhongxin(list, orderData) {
  var code = 0;
  var a = JSON.parse(JSON.stringify(list));
  console.log(a);
  //服务请求信息
  let params = JSON.stringify(a);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceAmcs +
    "/api/cloud/amcs/v1/clusters/" +
    a.envId +
    "/componentInstall/addComponentEureka";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = JSON.stringify({ namespace: a.nameSpace });
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // zhucezhongxin(a.envId, a, a.nameSpace).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {

  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

// 调用链服务
export function callChain(list, orderData) {
  var code = 0;
  var a = JSON.parse(JSON.stringify(list));
  console.log(a);
  //服务请求信息
  let params = JSON.stringify(a);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceAmcs +
    "/api/cloud/amcs/v1/clusters/" +
    a.envId +
    "/componentInstall/addComponentTrace";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = JSON.stringify({ namespace: a.nameSpace });
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // callChainApi(a.envId, a, a.nameSpace).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

//配置中心组件式安装部署
export function configurationCenterMethod(list, orderData) {
  var code = 0;
  var a = JSON.parse(JSON.stringify(list));
  console.log(a);

  //服务请求信息
  let params = JSON.stringify(a);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceAmcs +
    "/api/cloud/amcs/v1/clusters/1/componentInstall/assembly/deploy";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = JSON.stringify({ namespace: a.nameSpace });
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // configurationCenterAPi(a, a.nameSpace).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {

  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

//检测是否已安装注册中心
export function isRegistration(list, orderData) {
  var code = 0;
  var a = JSON.parse(JSON.stringify(list));
  console.log(a);

  registration(a, a.namespace).then(r => {
    code = r.code;
    if (r.code == 200) {
      // v.$notify({
      //   type: 'success',
      //   message: r.message
      // });
    } else {
      // v.$notify({
      //   type: 'error',
      //   message: r.message
      // });
    }
  });
  return code;
}

// 一键安装微服务
export function installMicroservices(data, orderData) {
  var code = 0;
  var obj = JSON.parse(JSON.stringify(data));
  console.log(obj);
  //服务请求信息
  let params = JSON.stringify(obj);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceAmcs +
    "/api/cloud/amcs/v1/clusters/" +
    obj.envId +
    "/componentInstall/addSpringcloud";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = JSON.stringify({ namespace: obj.nameSpace });
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // installMicroservicesAPI(obj.envId, obj, obj.nameSpace).then(r => {
  //   code = r.code;
  //   console.log(obj);
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

//开通SonarQube
export function createsonarQube(id, data, orderData) {
  var code = 0;
  console.log(data);
  var obj = JSON.parse(JSON.stringify(data));
  console.log(obj);
  console.log(id);
  var gitlabdata = {
    uid: id, // 唯一 id - 订单id
    sonar_url: obj.sonar_url, // 从云平台获取 nexus url 信息
    life_limit: obj.life_limit // 用户选择的使用年限来传给后端
  };

  //服务请求信息
  let params = JSON.stringify(gitlabdata);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfacePdts +
    "/api/cloud/pdts/v1/" +
    obj.namespace +
    "/sonar";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // sonarQube(obj.namespace, gitlabdata).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {

  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

// Gitlab
export function dredgeGitlab(id, data, orderData) {
  var code = 0;
  var obj = JSON.parse(JSON.stringify(data));
  console.log(obj);
  console.log(id);
  var gitlabdata = {
    uid: id, // 唯一 id - 订单id
    gitlab_url: obj.gitlab_url, // 从云平台获取 nexus url 信息
    life_limit: obj.life_limit // 用户选择的使用年限来传给后端
  };
  //服务请求信息
  let params = JSON.stringify(gitlabdata);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfacePdts +
    "/api/cloud/pdts/v1/" +
    obj.namespace +
    "/gitlab";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // dredgeGitlabApi(obj.namespace, gitlabdata).then(r => {
  //   code = r.code;
  //   console.log(code);
  //   if (r.code == 200) {
  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

//开通Hitchhiker
export function createhitchhiker(id, data, orderData) {
  var code = 0;
  var obj = JSON.parse(JSON.stringify(data));
  data.uid = id;
  console.log(obj);
  console.log(id);
  var gitlabdata = {
    uid: id, // 唯一 id - 订单id
    life_limit: obj.life_limit, // 用户选择的使用年限来传给后端
    cluster_id: obj.cluster_id, // 集群id
    cpu: obj.cpu,
    mem: obj.mem,
    storage: obj.storage,
    name: obj.name // 用户输入
  };
  //服务请求信息
  let params = JSON.stringify(gitlabdata);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfacePdts +
    "/api/cloud/pdts/v1/" +
    obj.project_id +
    "/" +
    obj.cluster_id +
    "/" +
    obj.namespace +
    "/hitchhikers";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // hitchhiker(obj.namespace, gitlabdata).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {

  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

//开通Jenkins
export function createjenkins(id, data, orderData) {
  var code = 0;
  var obj = JSON.parse(JSON.stringify(data));
  data.uid = id;
  console.log(obj);
  console.log(id);
  var gitlabdata = {
    uid: id, // 唯一 id - 订单id
    life_limit: obj.life_limit, // 用户选择的使用年限来传给后端
    cluster_id: obj.cluster_id, // 集群id
    cpu: obj.cpu,
    mem: obj.mem,
    projectNo: obj.projectNo,
    storage: obj.storage,
    name: obj.name // 用户输入
  };
  gitlabdata = JSON.stringify(gitlabdata);
  console.log(gitlabdata);
  //服务请求信息
  let params = gitlabdata;
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfacePdts +
    "/api/cloud/pdts/v1/" +
    obj.project_id +
    "/" +
    obj.cluster_id +
    "/" +
    obj.namespace +
    "/jenkins";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  console.log(platformParams);
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData.items[0].platformParams.params);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // jenkins(obj.namespace, gitlabdata).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {

  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

//开通Nexus
export function createNexus(id, data, orderData) {
  var code = 0;
  console.log(data);
  var obj = JSON.parse(JSON.stringify(data));
  console.log(obj);
  console.log(id);
  var nexusdata = {
    uid: id, // 唯一 id - 订单id
    nexus_url: obj.nexus_url, // 从云平台获取 nexus url 信息， 以 http[s]:// 开头，否则返回 400
    life_limit: obj.life_limit // 用户选择的使用年限来传给后端
  };
  //服务请求信息
  let params = JSON.stringify(nexusdata);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfacePdts +
    "/api/cloud/pdts/v1/" +
    obj.namespace +
    "/nexus";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // createNexusApi(obj.namespace, nexusdata).then(r => {
  //   code = r.code;
  //   if (r.code == 200) {

  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}

//开通jira
export function createJira(id, data, orderData) {
  var code = 0;
  console.log(data);
  var obj = JSON.parse(JSON.stringify(data));
  console.log(obj);
  console.log(id);
  var nexusdata = {
    uid: id, // 唯一 id - 订单id
    life_limit: obj.life_limit,
    key: obj.key, // 项目 key, 用户输入，只能输入 英文+数字，转换为大写
    project_type: obj.project_type, // 项目类型，单选项， 一个 Software, Business
    project_admin: obj.project_admin, // 管理员名称
    project_name: obj.project_name // 项目名称，用户输入
  };

  //服务请求信息
  let params = JSON.stringify(nexusdata);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfacePdts + "/api/cloud/pdts/v1/" + obj.namespace + "/jira";
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  //创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  // createJiraApi(obj.namespace, nexusdata).then(r => {
  //   console.log(r);
  //   // 创建axios实例
  //   const service = axios.create({
  //     baseURL: process.env.BASE_API, // api 的 base_url
  //     timeout: 5000 // 请求超时时间
  //   });
  //   service.interceptors.response.use(
  //     response => {
  //       console.log(response);
  //     });

  //   code = r.code;
  //   if (r.code == 200) {

  //     // v.$notify({
  //     //   type: 'success',
  //     //   message: r.message
  //     // });
  //   } else {
  //     // v.$notify({
  //     //   type: 'error',
  //     //   message: r.message
  //     // });
  //   }
  // });
  return code;
}
//创建redis
export function createRedis(data, orderData) {
  var code = 0;
  console.log(data);
  var obj = JSON.parse(JSON.stringify(data));

  //服务请求信息
  let params = JSON.stringify(obj);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceUsms + `/api/cloud/usms/v1/middlewares/redis`;
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  // 创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  return code;
}
//创建elasticsearch
export function createElasticsearch(data, orderData) {
  var code = 0;
  console.log(data);
  var obj = JSON.parse(JSON.stringify(data));

  //服务请求信息
  let params = JSON.stringify(obj);
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceUsms + `/api/cloud/usms/v1/middlewares/elasticsearch`;
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  // 创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  return code;
}

//创建Mysql 中间件
export function createMysql(data, orderData) {
  var code = 0;
  let platformParams = paramsObj;
  platformParams[0].requestModeParams.requestPath =
    baseURL.DataInterfaceCmss +
    `/api/cloud/cmss/v1/project/${data.projectNo}/kubernetes/${
      data.envId
    }/namespace/${data.namespace}/mysql/install`;
 
  
  //服务请求信息
 
  
  Vue.delete(data, "projectNo");
  Vue.delete(data, "namespace");
  Vue.delete(data, "envId");
  var obj = JSON.parse(JSON.stringify(data));
  let params = JSON.stringify(obj);
  platformParams[0].requestModeParams.httpMethod = "post";
  platformParams[0].params = params;
  platformParams[0].headers = "";
  orderData.items[0].platformParams = JSON.stringify(platformParams);
  console.log(orderData);
  // 创建订单
  postOrders(orderData).then(r => {
    console.log(r);
    if (r.code == 201) {
      v.$notify({
        type: "success",
        message: r.message
      });
    } else {
      v.$notify({
        type: "error",
        message: r.message
      });
    }
  });
  return code;
}
