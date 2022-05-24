using Domain.Entities;
using Newtonsoft.Json;

namespace Api.Services;

public static class SeedingServices
{
    //public static
    public static dynamic LoadJson(string f)
    {
        using (StreamReader r = new StreamReader("./MockData/" + f))
        {
            string json = r.ReadToEnd();
            dynamic array = JsonConvert.DeserializeObject(json);
            return array;
        }
    }
}
