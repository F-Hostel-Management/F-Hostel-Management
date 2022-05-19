using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configurations
{
    public class AppSettings
    {
        public DbConfig ConnectionStrings { get; set; }
        public JwtSetting JwtSetting { get; set; }
    }
}
