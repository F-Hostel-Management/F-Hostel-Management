using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utilities
{
    public static class CodeGeneratorUtil
    {
        public static string genarateByNowDateTime()
        {
            var now = DateTime.Now;
            return now.ToString("yyyyMMdd_HHmmss");
        }
    }
}
