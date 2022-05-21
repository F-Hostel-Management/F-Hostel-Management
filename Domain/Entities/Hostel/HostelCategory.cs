using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities;
[Table("HostelCategory")]
public class HostelCategory : BaseEntity, Category
{
    public string CategoryName { get; set; }
    // navigation props

    // hostel
    public virtual ICollection<HostelEntity> Hostels { get; set; }

}
