<template>
  <div id="app">
    <el-row style="background-color: white">
      <el-col
        :offset="2"
        :span="20"
        style="border-bottom:1px solid rgba(224, 224, 224, 1);    margin-top: 8%;background-color: white；"
      >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">协议中心</el-breadcrumb-item>
          <el-breadcrumb-item>法律声明</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col style="margin-top: 20px;background-color: white" :offset="2" :span="20">
        <el-col :span="4">
          <div class="aa">
            <img src="../../../static/images/law.png" alt />
            <br />
            <span class="title" style="margin: 20% 0;">法律声明</span>
          </div>
          <el-tabs :tab-position="tabPosition" style="height: 80px;">
            <el-tab-pane style="font-size:14px" label="法律声明"></el-tab-pane>
            <!-- <el-tab-pane style="font-size:14px" label="隐私政策"></el-tab-pane> -->
          </el-tabs>
          <!-- <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <span style="font-size:14px;color:#333;">云服务等级协议</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">云账号消除协议</el-menu-item>
                <el-menu-item index="1-2">云安全违规事件...</el-menu-item>
                <el-menu-item index="1-3">免费试用服务条款</el-menu-item>
                <el-menu-item index="1-4">退款流程及协议</el-menu-item>
                <el-menu-item index="1-5">常见问题</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu> -->
        </el-col>
        <el-col :span="1" style="height:100%;">
          <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :offset="1" :span="18">
          <span class="title">法律声明</span>
         
          <!-- <el-col :offset="17" :span="7">
            <div class="xiazai">
              <img src="../../../static/images/xiazai.png" alt />
              <span style="color:#e6e6e6">查看文档</span>
              &emsp;
              <img src="../../../static/images/chakan.png" alt />
              <span style="color:#e6e6e6">查看PDF格式</span>
            </div>
          </el-col> -->
          <br />
          <br />
          <br />
          <span>&emsp;&emsp;海油云（以下或称为“我们”）尊重并保护用户信息，并且将以高度勤勉和审慎的义务对待这些信息。在您使用了海油云网站提供的服务时，我们将按照本隐私权政策收集、处理及披露您的信息。我们希望通过本隐私权政策向您清晰地介绍我们对您信息的处理方式，因此我们建议您完整地阅读本隐私权政策，以帮助您了解维护自己隐私权的方式。 如果您有任何疑问、意见或建议，请通过海油云提供的各种联系方式与我们联系。 本政策将帮助您了解以下内容：</span>
          <br />
          <br />
          <br />
          <span class="title1">一、本协议的适用范围</span>
          <br />
          <br />
          <span>1.1. 本隐私权政策适用于海油云网站所有服务。服务包括向您提供页面浏览、网站登录服务，以及通过海油云网站向您提供的技术服务。</span>
          <br />
          <br />
          <span>1.2. 本隐私权政策不适用于其他第三方向您提供的服务。例如，海油云云市场上的服务商依托云市场向您提供服务时，您向服务商提供的信息不适用本隐私权政策。</span>
          <br />
          <br />
          <span>1.3. 需要特别说明的是，作为海油云的用户，若您利用海油云的技术服务，为您的用户再行提供服务，因您的业务数据属于您所有，您应当另行与您的用户约定隐私权政策。</span>
          <br />
          <br />
          <span class="title1">二、我们如何收集和使用您的用户信息</span>
          <br />
          <br />
          <span class="title2">（一）我们收集您的用户信息的情形</span>
          <br />
          <br />
          <span>2.1. 帮助您成为我们的会员</span>
          <br />
          <br />
          <span>2.1.1. 当您在海油云网站创建账户时，您须向我们提供会员名，设置、确认您的登录密码，提供您在中华人民共和国境内手机号码。您提交的手机号码用于您注册、登录、绑定账户、密码找回时接受验证码，并且作为您与海油云指定的联系方式之一，用来接受相关业务通知（如新品上线、服务变更等）。</span>
          <br />
          <span>2.1.2. 在您注册完成海油云账户后，您可以在账户“基本资料”一栏中继续填写您的信息，包括（1）您的会员身份类型（个人、企业）、单位名称（如果您已完成实名认证，单位名称将会以您的实名认证信息为准）、营业年限、企业规模、从事行业、主营业务、主要产品、网站域名;（2）联系信息（国家、所在地区、街道、联系电话、传真）。您若不提供这些信息，将不会影响您对某一具体技术服务的使用。您提供的本条第（1）类信息，会帮助我们更了解您对于海油云服务需求，以便海油云有针对性的向您推广、介绍产品；您提供的本条第（2）类信息，海油云可能会利用如上方式向您推广、宣传产品、邮寄业务通知（含账单）或与您进行业务沟通。</span>
          <br />
          <span>2.1.3. 在您注册完成海油云账户后，您需在账号的管理控制台提交联系人信息，包括您指定联系人的邮箱、手机号码以及联系人的职位。海油云将通过如上信息向您推广、介绍产品，发送业务通知（含账单）或与您进行业务沟通。</span>
          <br />
          <span>2.1.4. 如果您仅需使用海油云网站的浏览、搜索等基本服务，您不需要注册成为我们的会员及提供上述信息。</span>
          <br />
          <span>2.1.5. 如果您已经注册有淘宝平台账户、1688账号、钉钉账号、支付宝账号或新浪微博账号的，您可利用前述账号登录海油云的网站。您通过淘宝平台账户和支付宝账号登录海油云网站的，您相应账号的实名注册信息（姓名/企业名称、身份证号/营业执照号、手机号/邮箱）将同步至海油云。您通过1688账号登录海油云网站的，您仍需按照海油云提供的实名认证方式提交您的真实身份信息。您也可以通过新浪微博账号和钉钉账号登录海油云网站，该新浪微博账号、钉钉账号将绑定海油云账号，您通过海油云的实名认证向海油云提供您的真实身份信息。我们会将依据与第三方的约定，在符合相关法律法规规定的前提下，使用您的这些用户信息。</span>
          <br />
          <br />
          <span>2.2. 向您提供技术服务</span>
          <br />
          <br />
          <span>2.2.1. 根据中华人民共和国法律，在您使用具体的技术服务时，您应通过您的账号提供您的真实身份信息。您通过海油云账号提供真实身份信息的，海油云为您提供了多种方式以协助您提供信息，您应根据您的身份属性选择适合的方式。如您通过支付宝实名认证来提供您的真实信息，您需先行输入支付宝账户以及密码登录支付宝账户，通过将支付宝账户绑定您的海油云账户完成实名认证，在完成实名认证后，您即通过支付宝向海油云提交了您的姓名（单位主体名称）、身份证号码（营业执照号码）。如您通过企业对公账号方式进行实名认证的，您需向海油云提交您的企业注册地区、企业性质、企业名称和营业执照注册号，以及银行账户信息（包括开户行、银行账号和开户人）。海油云将以您提交的企业注册地区、企业性质、企业名称和营业执照注册号确认您的实名信息，海油云仅将您提供的银行账户信息（包括开户行、银行账号和开户人）作为实名认证时的打款账号。如果您通过人脸识别来进行实名认证的，您需要向我们提供面部特征的生物识别信息和您身份证正、反面照片。</span>
          <br />
          <span>2.2.2.在您使用服务过程中我们会收集以下的信息：</span>
          <br />
          <span>2.2.2.1. 设备信息：我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息（例如设备型号、操作系统版本、设备设置、唯一设备标识符等软硬件特征信息）、设备所在位置相关信息（例如IP地址、GPS位置以及能够提供相关信息的Wi-Fi接入点、蓝牙和基站等传感器信息）。我们可能会将前面两类信息进行关联，以便我们能在不同设备上为您提供一致的服务。</span>
          <br />
          <span>2.2.2.2. 日志信息：当您使用我们的网站或客户端提供的服务时，我们会自动收集您对我们服务的详细使用情况，作为有关网络日志保存。例如您的搜索查询内容、IP地址、浏览器的类型、电信运营商、使用的语言、访问日期和时间及您访问的网页记录等。</span>
          <br />
          <span>2.2.2.3. 用户账户的支持信息：基于您使用海油云服务而产生的用户的咨询记录、报障记录和针对用户故障的排障过程（如通信或通话记录），海油云将通过记录、分析这些信息以便更及时响应您的帮助请求，以及用于改进服务。</span>
          <br />
          <span>2.2.3. 我们在向您提供业务功能或具体服务时，我们会按照本政策以及相应的产品服务协议的约定收集、使用、存储、对外提供及保护您的用户信息；超出本政策以及相应的产品服务协议约定收集您的用户信息的，我们会另行向您说明信息收集的范围与目的，并征得您的同意后方收集提供相应服务所必要的您的信息；如您选择不提供前述信息，将会影响到您使用相应产品，但不会影响您使用海油云网站基本功能和其他产品。</span>
          <br />
          <br />
          <span class="title2">（二）我们使用您的用户信息的情形</span>
          <br />
          <br />
          <span>2.3. 我们出于如下目的，使用您提交以及我们收集的用户信息：</span>
          <br />
          <br />
          <span>2.3.1. 为了向您提供服务，我们会向您发送信息、通知或与您进行业务沟通，包括但不限于为保证服务完成所必须的验证码、使用服务时所必要的推送通知；</span>
          <br />
          <span>2.3.2. 为了维护、改进服务，向您提供更符合您个性化需求的信息展示，我们可能将来自海油云网站某项服务的用户信息与来自其他项服务的信息结合起来，做出特征模型并进行用户画像，向您展示、推送信息和可能的商业广告，包括但不限于关于海油云产品的新闻以及市场活动及优惠促销信息、海油云合作第三方的推广信息，或其他您可能感兴趣的内容。如果您不想接收我们给您发送的商业性电子信息，您可通过短信提示回复退订或根据信息中提供的退订方式予以退订；</span>
          <br />
          <span>2.3.3. 我们可能以用户信息统计数据为基础，设计、开发、推广全新的产品及服务；我们会对我们的服务使用情况进行统计，并可能会与公众或第三方分享这些统计信息，但这些统计信息不包含您的任何身份识别信息；</span>
          <br />
          <span>2.3.4. 为提高您使用我们及我们关联公司、合作伙伴提供服务的安全性，确保操作环境安全与识别账号异常状态，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或海油云相关协议、规则的情况，我们可能使用您的会员信息、并整合设备信息、有关网络日志以及我们关联公司、合作伙伴合法分享的信息，来判断您账户及交易风险、进行身份验证、安全事件的检测及防范，并依法采取必要的记录、审计、分析、处置措施；</span>
          <br />
          <span>2.3.5. 如超出收集用户信息时所声称的目的，或者在超出具有直接或合理关联的范围使用用户信息前，我们会再次向您告知并征得您的明示同意。</span>
          <br />
          <br />
          <span class="title1">三、 我们如何共享、转让、公开披露您的用户信息</span>
          <br />
          <br />
          <span>3.1. 共享</span>
          <br />
          <br />
          <span>我们不会与其他组织和个人共享您的用户信息，但以下情况除外：</span>
          <br />
          <span>3.1.1.在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的用户信息；</span>
          <br />
          <span>3.1.2.在法定情形下的共享：我们可能会根据法律法规规定、诉讼、仲裁解决需要，或按行政、司法机关依法提出的要求，对外共享您的用户信息；</span>
          <br />
          <span>3.1.3.为了促成交易或协助解决争议，某些情况下只有共享您的用户信息，才能促成交易或处理您与他人的纠纷或争议，例如，在海油云云市场上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，海油云有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成；</span>
          <br />
          <span>3.1.4.与授权合作伙伴共享：我们可能委托受信赖的合作伙伴来提供服务，因此我们可能会与合作伙伴共享您的某些用户信息，以提供更好的客户服务和优化用户体验。我们仅会出于合法、正当、必要、特定、明确的目的共享您的用户信息，并且只会共享提供服务所必要的用户信息。我们的合作伙伴无权将共享的用户信息用于任何其他用途。 目前，我们的授权合作伙伴包括如下类型：供应商、服务提供商和其他合作伙伴。我们将信息发送给支持我们业务的供应商、服务提供商和其他合作伙伴，这些支持包括提供基础技术服务、提供咨询、分析等专业服务。 对我们与之共享用户信息的公司、组织和个人，我们会与其签署严格的保密协议以及信息保护约定，要求他们按照我们的说明、本隐私权政策以及其他任何相关的保密和安全措施来处理用户信息。</span>
          <br />
          <br />
          <span>3.2. 转让</span>
          <br />
          <br />
          <span>我们不会将您的用户信息转让给任何公司、组织和个人，但以下情况除外：</span>
          <br />
          <span>3.2.1. 在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的用户信息；</span>
          <br />
          <span>3.2.2. 在海油云与其他法律主体者发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到用户信息转让，我们会要求新的持有您用户信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。</span>
          <br />
          <br />
          <span>3.3. 公开披露</span>
          <br />
          <br />
          <span>我们仅会在以下情况下，公开披露您的用户信息：</span>
          <br />
          <span>3.3.1． 获得您明确同意或基于您的主动选择，我们可能会公开披露您的用户信息；</span>
          <br />
          <span>3.3.2. 或为保护海油云平台及其关联公司用户或公众的人身财产安全免遭侵害，我们可能依据适用的法律或海油云平台相关协议、规则披露关于您的用户信息。例如，若您作为云市场服务...</span>
          <br />
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script >
import topBar from "../../components/hd1/topBarBlack";
export default {
  name: "App",
  components: {
    topBar
  },
  data: function() {
    return {
      tabPosition: "left",
      username: "",
      password: "",
      pics: [
        "web/static/images/banner.jpg",
        "web/static/images/banner1.jpg",
        "web/static/images/banner2.jpg"
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    registerUser() {
      alert("注册");
    },
    updatePasswrod() {
      alert("修改密码");
    }
  }
};
</script>
<style>
.m-topBar {
  background-color: #11151c !important;
}
</style>
<style lang="scss" scoped>
span {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #666;
}
.aa {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 20%;
}
.title {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.title1 {
  font-size: 14px;
  font-weight: 700;
  font-family: MicrosoftYaHei-Bold;
  color: rgba(51, 51, 51, 1);
}
.title2 {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: rgba(51, 51, 51, 1);
}
.grid-content {
  margin-top: 15%;
}
.xiazai {
  display: inline-block;
  cursor: pointer;
}
.xiazai img {
  width: 8%;
}
.box {
  width: 1px;
  height: 6px;
  color: #999;
  border: 8px solid transparent;
  border-top: 8px solid;
  box-shadow: 0 -12px 0 -4px;
  background: linear-gradient(to bottom, #ffffff 50%, #999 50%) repeat-x;
}
/deep/ .el-divider--vertical {
  height: 122rem;
  margin: -20px 45px;
}
/deep/.el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  right: 0;
  right: auto;
}
/deep/.el-submenu .el-menu-item {
  padding: 0 20px !important;
}
/deep/.el-tabs--left .el-tabs__nav-wrap.is-left::after,
.el-tabs--left .el-tabs__nav-wrap.is-right::after,
.el-tabs--right .el-tabs__nav-wrap.is-left::after,
.el-tabs--right .el-tabs__nav-wrap.is-right::after {
  height: 0;
}
/deep/.el-breadcrumb {
  line-height: 4;
}
/deep/ .el-breadcrumb__inner {
  color: #409eff;
  font-size: 14px;
}
.el-menu {
  border: 0;
}
/deep/.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: transparent;
}
@media screen and (max-width: 1024px) {
  /deep/ .el-divider--vertical {
    height: 145rem;
    margin: -20px 45px;
  }
  /deep/.el-breadcrumb {
    margin-top:2%;
  }
  .el-submenu__title i{
    margin-left: 5%;
  }
}
</style>
