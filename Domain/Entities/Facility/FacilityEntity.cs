using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Facility;
public class FacilityEntity : BaseEntity
{
    public string Name { get; set; }
    public double Price { get; set; }
}
