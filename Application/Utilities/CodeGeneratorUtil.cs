namespace Application.Utilities
{
    public static class CodeGeneratorUtil
    {
        public static string genarateByNowDateTime()
        {
            var now = DateTime.Now;
            return now.ToString("yyyyMMdd_HHmmss_fff");
        }
    }
}
