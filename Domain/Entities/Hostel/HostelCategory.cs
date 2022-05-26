using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities;
[Table("HostelCategories")]
public class HostelCategory : BaseEntity, Category
{
    public string CategoryName { get; set; }
    // navigation props

    // 1 type - M hostels
    public virtual ICollection<HostelEntity> Hostels { get; set; }

}
