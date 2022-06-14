using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace Application.Utilities;

public class PaymentUtil
{
    public static String HmacSHA512(string key, String inputData)
    {
        var hash = new StringBuilder(); 
        byte[] keyBytes = Encoding.UTF8.GetBytes(key);
        byte[] inputBytes = Encoding.UTF8.GetBytes(inputData);
        using (var hmac = new HMACSHA512(keyBytes))
        {
            byte[] hashValue = hmac.ComputeHash(inputBytes);
            foreach (var theByte in hashValue)
            {
                hash.Append(theByte.ToString("x2"));
            }
        }

        return hash.ToString();
    }
    // public static string GetIpAddress()
    // {
    //     string ipAddress;
    //     try
    //     {
    //         HttpContext
    //         ipAddress = HttpContext.req .Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
    //
    //         if (string.IsNullOrEmpty(ipAddress) || (ipAddress.ToLower() == "unknown")|| ipAddress.Length>45)
    //             ipAddress = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
    //     }
    //     catch (Exception ex)
    //     {
    //         ipAddress = "Invalid IP:" + ex.Message;
    //     }
    //
    //     return ipAddress;
    // }
}