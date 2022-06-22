using System.Text;

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
	public static string Mask(this string source, int start, int maskLength)
	{
		return source.Mask(start, maskLength, 'X');
	}

	public static string Mask(this string source, int start, int maskLength, char maskCharacter)
	{
		if (start > source.Length - 1)
		{
			throw new ArgumentException("Start position is greater than string length");
		}

		if (maskLength > source.Length)
		{
			throw new ArgumentException("Mask length is greater than string length");
		}

		if (start + maskLength > source.Length)
		{
			throw new ArgumentException("Start position and mask length imply more characters than are present");
		}

		string mask = new string(maskCharacter, maskLength);
		string unMaskStart = source.Substring(0, start);
		string unMaskEnd = source.Substring(start + maskLength, source.Length - maskLength - start);

		return unMaskStart + mask + unMaskEnd;
	}
}
