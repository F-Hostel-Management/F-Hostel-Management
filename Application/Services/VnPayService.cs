using System.Collections.Specialized;
using System.Globalization;
using System.Net;
using System.Text;
using Application.AppConfig;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Application.Utilities;
using Domain.Entities.Invoice;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using Org.BouncyCastle.Asn1.Ocsp;

namespace Application.Services;

public class VnPayService : IPaymentService
{
    public const string VERSION = "2.1.0";
    private SortedList<String, String> _requestData = new SortedList<String, String>(new VnPayCompare());
    private SortedList<String, String> _responseData = new SortedList<String, String>(new VnPayCompare());

    private readonly AppSettings _options;
    private readonly IGenericRepository<InvoiceEntity> _invoiceRepo;
    private readonly IWebHostEnvironment  _appEnv;

    public VnPayService(IOptions<AppSettings> options, IGenericRepository<InvoiceEntity> invoiceRepo, IWebHostEnvironment appEnv)
    {
        _invoiceRepo = invoiceRepo;
        _appEnv = appEnv;
        _options = options.Value;
    }

    public void AddRequestData(string key, string value)
    {
        if (!String.IsNullOrEmpty(value))
        {
            _requestData.Add(key, value);
        }
    }

    public void AddResponseData(string key, string value)
    {
        if (!String.IsNullOrEmpty(value))
        {
            _responseData.Add(key, value);
        }
    }

    public string GetResponseData(string key)
    {
        string retValue;
        if (_responseData.TryGetValue(key, out retValue))
        {
            return retValue;
        }
        else
        {
            return string.Empty;
        }
    }

    #region Request

    public string CreateRequestUrl(string baseUrl, string vnp_HashSecret)
    {
        StringBuilder data = new StringBuilder();
        foreach (KeyValuePair<string, string> kv in _requestData)
        {
            if (!String.IsNullOrEmpty(kv.Value))
            {
                data.Append(WebUtility.UrlEncode(kv.Key) + "=" + WebUtility.UrlEncode(kv.Value) + "&");
            }
        }

        string queryString = data.ToString();

        baseUrl += "?" + queryString;
        String signData = queryString;
        if (signData.Length > 0)
        {
            signData = signData.Remove(data.Length - 1, 1);
        }

        string vnp_SecureHash = PaymentUtil.HmacSHA512(vnp_HashSecret, signData);
        baseUrl += "vnp_SecureHash=" + vnp_SecureHash;

        return baseUrl;
    }

    #endregion

    #region Response process

    public bool ValidateSignature(string inputHash, string secretKey)
    {
        string rspRaw = GetResponseData();
        string myChecksum = PaymentUtil.HmacSHA512(secretKey, rspRaw);
        return myChecksum.Equals(inputHash, StringComparison.InvariantCultureIgnoreCase);
    }

    private string GetResponseData()
    {
        StringBuilder data = new StringBuilder();
        if (_responseData.ContainsKey("vnp_SecureHashType"))
        {
            _responseData.Remove("vnp_SecureHashType");
        }

        if (_responseData.ContainsKey("vnp_SecureHash"))
        {
            _responseData.Remove("vnp_SecureHash");
        }

        foreach (KeyValuePair<string, string> kv in _responseData)
        {
            if (!String.IsNullOrEmpty(kv.Value))
            {
                data.Append(WebUtility.UrlEncode(kv.Key) + "=" + WebUtility.UrlEncode(kv.Value) + "&");
            }
        }

        //remove last '&'
        if (data.Length > 0)
        {
            data.Remove(data.Length - 1, 1);
        }

        return data.ToString();
    }

    #endregion

    public class VnPayCompare : IComparer<string>
    {
        public int Compare(string x, string y)
        {
            if (x == y) return 0;
            if (x == null) return -1;
            if (y == null) return 1;
            var vnpCompare = CompareInfo.GetCompareInfo("en-US");
            return vnpCompare.Compare(x, y, CompareOptions.Ordinal);
        }
    }

    public string CreatePaymentFromInvoice(InvoiceEntity invoiceEntity)
    {
        _requestData.Clear();
        //Get Config Info
        var vnp_Returnurl = _options.VnPayConfig.ReturnUrl;
        
         ; //URL nhan ket qua tra ve 
        var vnp_Url = _options.VnPayConfig.Url; //URL thanh toan cua VNPAY 
        var vnp_TmnCode = _options.VnPayConfig.TmnCode; //Ma website
        var vnp_HashSecret = _options.VnPayConfig.HashSecret; //Chuoi bi mat
        if (string.IsNullOrEmpty(vnp_TmnCode) || string.IsNullOrEmpty(vnp_HashSecret))
        {
            // lblMessage.Text = "Vui lòng cấu hình các tham số: vnp_TmnCode,vnp_HashSecret trong file web.config";
            // return;
        }

        this.AddRequestData("vnp_Version", VERSION);
        this.AddRequestData("vnp_Command", "pay");
        this.AddRequestData("vnp_TmnCode", vnp_TmnCode);
        this.AddRequestData("vnp_Amount", ((long) invoiceEntity.Price * 100).ToString());
        //Get payment input
        // OrderInfo order = new OrderInfo();
        //Save order to db
        // order.OrderId = DateTime.Now.Ticks; // Giả lập mã giao dịch hệ thống merchant gửi sang VNPAY
        // order.Amount = 100000; // Giả lập số tiền thanh toán hệ thống merchant gửi sang VNPAY 100,000 VND
        // order.Status = "0"; //0: Trạng thái thanh toán "chờ thanh toán" hoặc "Pending"
        // order.OrderDesc = txtOrderDesc.Text;
        // order.CreatedDate = DateTime.Now;
        // string locale = cboLanguage.SelectedItem.Value;
        AddRequestData("vnp_CreateDate", invoiceEntity.Date.ToString("yyyyMMddHHmmss"));
        AddRequestData("vnp_CurrCode", "VND");
        AddRequestData("vnp_IpAddr", "");
        AddRequestData("vnp_Locale", "vn");
        AddRequestData("vnp_OrderInfo", "Thanh toan don hang:" + invoiceEntity.Id);
        AddRequestData("vnp_OrderType", "other"); //default value: other
        AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
        var txnRef = invoiceEntity.Id + "|" + DateTime.Now.Millisecond;
        AddRequestData("vnp_TxnRef", txnRef
        ); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày

        //Add Params of 2.1.0 Version
        AddRequestData("vnp_ExpireDate", "20230924083000");
        //Billing
        AddRequestData("vnp_Bill_Email", "huybui479@gmail.com");
        // var fullName = txt_billing_fullname.Text.Trim();
        // if (!String.IsNullOrEmpty(fullName))
        // {
        //     var indexof = fullName.IndexOf(' ');
        //     vnpay.AddRequestData("vnp_Bill_FirstName", fullName.Substring(0, indexof));
        //     vnpay.AddRequestData("vnp_Bill_LastName", fullName.Substring(indexof + 1, fullName.Length - indexof - 1));
        // }

        // vnpay.AddRequestData("vnp_Bill_Address", txt_inv_addr1.Text.Trim());
        // vnpay.AddRequestData("vnp_Bill_City", txt_bill_city.Text.Trim());
        // vnpay.AddRequestData("vnp_Bill_Country", txt_bill_country.Text.Trim());
        // vnpay.AddRequestData("vnp_Bill_State", "");

        // Invoice

        // vnpay.AddRequestData("vnp_Inv_Phone", txt_inv_mobile.Text.Trim());
        // vnpay.AddRequestData("vnp_Inv_Email", txt_inv_email.Text.Trim());
        // vnpay.AddRequestData("vnp_Inv_Customer", txt_inv_customer.Text.Trim());
        // vnpay.AddRequestData("vnp_Inv_Address", txt_inv_addr1.Text.Trim());
        // vnpay.AddRequestData("vnp_Inv_Company", txt_inv_company.Text);
        // vnpay.AddRequestData("vnp_Inv_Taxcode", txt_inv_taxcode.Text);
        // vnpay.AddRequestData("vnp_Inv_Type", cbo_inv_type.SelectedItem.Value);
        string paymentUrl = CreateRequestUrl(vnp_Url, vnp_HashSecret);
        return paymentUrl;
    }

    public async Task ProcessCallback(Dictionary<string, StringValues> queryData, Guid tenantPaidId)
    {
        string msg = "";
        int isSuccess = 0;
        if (queryData.Count > 0)
        {
            string vnp_HashSecret = _options.VnPayConfig.HashSecret; //Chuoi bi mat
            var vnpayData = queryData;
            _responseData.Clear();

            foreach (string s in vnpayData.Keys)
            {
                //get all querystring data
                if (!string.IsNullOrEmpty(s) && s.StartsWith("vnp_"))
                {
                    AddResponseData(s, vnpayData[s]);
                }
            }
            //vnp_TxnRef: Ma don hang merchant gui VNPAY tai command=pay    
            //vnp_TransactionNo: Ma GD tai he thong VNPAY
            //vnp_ResponseCode:Response code from VNPAY: 00: Thanh cong, Khac 00: Xem tai lieu
            //vnp_SecureHash: HmacSHA512 cua du lieu tra ve

            Guid invoiceId = Guid.Parse(GetResponseData("vnp_TxnRef").Split('|')[0]);
            long vnpayTranId = Convert.ToInt64(GetResponseData("vnp_TransactionNo"));
            string vnp_ResponseCode = GetResponseData("vnp_ResponseCode");
            string vnp_TransactionStatus = GetResponseData("vnp_TransactionStatus");
            String vnp_SecureHash = queryData["vnp_SecureHash"];
            String TerminalID = queryData["vnp_TmnCode"];
            long vnp_Amount = Convert.ToInt64(GetResponseData("vnp_Amount")) / 100;
            String bankCode = queryData["vnp_BankCode"];

            bool checkSignature = ValidateSignature(vnp_SecureHash, vnp_HashSecret);
            if (checkSignature)
            {
                if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
                {
                    var invoice = await _invoiceRepo.FindByIdAsync(invoiceId);
                    if (invoice is not null && invoice.TenantPaid is null)
                    {
                        invoice.TenantPaidId = tenantPaidId;
                        await _invoiceRepo.UpdateAsync(invoice);
                    }

                    isSuccess = 1;
                }
                else
                {
                    msg = string.Format("Thanh toan loi, OrderId={0}, VNPAY TranId={1},ResponseCode={2}",
                        invoiceId, vnpayTranId, vnp_ResponseCode);
                    // throw new BadRequestException(msg);
                    //Thanh toan khong thanh cong. Ma loi: vnp_ResponseCode
                    // displayMsg.InnerText = "Có lỗi xảy ra trong quá trình xử lý.Mã lỗi: " + vnp_ResponseCode;
                    // log.InfoFormat("Thanh toan loi, OrderId={0}, VNPAY TranId={1},ResponseCode={2}", orderId, vnpayTranId, vnp_ResponseCode);
                }
                // displayTmnCode.InnerText = "Mã Website (Terminal ID):" + TerminalID;
                // displayTxnRef.InnerText = "Mã giao dịch thanh toán:" + orderId.ToString();
                // displayVnpayTranNo.InnerText = "Mã giao dịch tại VNPAY:" + vnpayTranId.ToString();
                // displayAmount.InnerText = "Số tiền thanh toán (VND):" + vnp_Amount.ToString();
                // displayBankCode.InnerText = "Ngân hàng thanh toán:" + bankCode;
            }
            else
            {
                msg = "There is an error during the process!";
                // log.InfoFormat("Invalid signature, InputData={0}", Request.RawUrl);
                // displayMsg.InnerText = "Có lỗi xảy ra trong quá trình xử lý";
            }
        }

        queryData.Add("be_msg", msg);
        queryData.Add("isSuccess", isSuccess.ToString());
    }
}