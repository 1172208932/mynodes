/**
 * 获取链接上的query值
 * @param name - 字段名称
 */
export declare function getQueryString(name: string): string;
/**
 * 自动登录方法
 * @param id - 项目id。
 * @param isTest - 是否是测试环境。
 */
export declare function autoLogin(id: number, isTest?: boolean): void;
/**
 * 获取微信token
 * @returns - 返回token。
 */
export declare function getWxToken(): string;
/**
 * 获取微信token
 * @returns - 返回accessToken。
 */
export declare function getAccessToken(): string;
