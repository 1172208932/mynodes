declare function wxShare(canShare: any, a: any, b: any, c: any, d: any, e: any): void;
declare function getWxAddress(): Promise<unknown>;
declare function wxBridgePay(params: any, callback: any): void;
declare function wxApiPay(data: any): Promise<unknown>;
declare function textfn(): string;
export { wxShare, wxBridgePay, wxApiPay, getWxAddress, textfn };
