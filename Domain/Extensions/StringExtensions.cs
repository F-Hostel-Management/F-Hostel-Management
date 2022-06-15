using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Extensions;
public static class StringExtensions
{
    public static T ParseEnum<T>(this string value)
    {
        return (T)Enum.Parse(typeof(T), value, true);
    }

    public static string EncodeBase64(this string plainText, Encoding encoding = null)
    {
        if (plainText == null) return null;

        // use UTF8 as default encoding type
        encoding = encoding ?? Encoding.UTF8;
        var bytes = encoding.GetBytes(plainText);
        return Convert.ToBase64String(bytes);
    }
}
