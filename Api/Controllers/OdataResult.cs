using System.Text.Json.Serialization;

namespace Api.Controllers
{
    public class Odata
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Style", "IDE1006:Naming Styles", Justification = "<Pending>")]
        public int count { get; set; }
        public string Context { get; set; }
    }

    public class OdataResult<T>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Style", "IDE1006:Naming Styles", Justification = "<Pending>")]
        public Odata odata { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Style", "IDE1006:Naming Styles", Justification = "<Pending>")]
        public object value { get; set; }
        [JsonIgnore]
        public List<T> Value => value as List<T> ?? new List<T>();
        public string Query { get; set; }

        public OdataResult()
        {
            odata = new Odata();
            value = new List<T>();
        }
    }
}