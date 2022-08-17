import axios from "axios";

/**
 * 获取链接上的query值
 * @param name - 字段名称
 */
export function getQueryString(name: string) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r =
    window.location.search.substr(1).match(reg) ||
    window.location.hash
      .substring(window.location.hash.search(/\?/) + 1)
      .match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

function getToken(code, isTest) {
  const snsUrl = isTest ? "http://10.30.129.75/" : "https://sns.cztv.com/";
  const getTokenApi = `${snsUrl}api/v2/iblue/auth/hudong/token`;

  return axios
    .post(
      `${getTokenApi}`,
      {
        hudongToken: code,
      },
      {
        headers: { "content-type": "application/json;charset=utf-8" },
      }
    )
    .then((res) => res?.data);
}

/**
 * 自动登录方法
 * @param id - 项目id。
 * @param isTest - 是否是测试环境。
 */
export function autoLogin(id: number, isTest: boolean = false) {
  let token = getQueryString("token");
  let code = getQueryString("code");
  let sessionToken = window.sessionStorage.getItem("wxToken");
  let accessToken = window.sessionStorage.getItem("accessToken");

  if (isTest) {
    // text
    if (code) {
      window.location.replace(
        `http://testtv-h5.cztvcloud.com/ssohudong/v2/wechat/auth?beyond_domain=${id}&data_id=251852&scope=snsapi_userinfo&code=${code}&address=sns`
      );
      return;
    }

    if (token) {
      window.sessionStorage.setItem("wxToken", token);
      getToken(token, isTest).then((res) => {
        if (res?.data?.access_token) {
          window.sessionStorage.setItem("accessToken", res.data.access_token);
          window.location.replace(window.location.href.split("?")[0]);
        }
      });
    } else if (sessionToken) {
      if (!accessToken) {
        window.location.replace(
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx59f73620f991519f&redirect_uri=http%3A%2F%2Fmhudong.cztv.com%2F${id}%23%2F&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
        );
      }
    } else {
      window.location.replace(
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx59f73620f991519f&redirect_uri=http%3A%2F%2Fmhudong.cztv.com%2F${id}%23%2F&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      );
    }
    return;
  }

  if (token) {
    window.sessionStorage.setItem("wxToken", token);
    getToken(token, isTest).then((res) => {
      if (res?.data?.access_token) {
        window.sessionStorage.setItem("accessToken", res.data.access_token);
      }
    });
    window.location.replace(window.location.href.split("?")[0]);
  } else if (sessionToken) {
    if (!accessToken) {
      window.location.replace(
        `https://ssohudong.cztv.com/v2/wechat/auth?data_id=${id}&scope=snsapi_userinfo`
      );
    }
  } else {
    window.location.replace(
      `https://ssohudong.cztv.com/v2/wechat/auth?data_id=${id}&scope=snsapi_userinfo`
    );
  }
}

/**
 * 获取微信token
 * @returns - 返回token。
 */
export function getWxToken(): string {
  return window.sessionStorage.getItem("wxToken");
}

/**
 * 获取accessToken。
 * @returns - 返回accessToken。
 */
export function getAccessToken(): string {
  return window.sessionStorage.getItem("accessToken");
}
