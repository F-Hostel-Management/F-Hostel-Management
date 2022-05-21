using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Hostel;
[Table("HostelManagent")]
public class HostelManagement : BaseEntity
{
    [Column(Order = 1)]
    public Guid HostelId { get; set; }
    public HostelEntity Hostel { get; set; }
    [Column(Order = 2)]
    public Guid ManagerId { get; set; }
    public UserEntity Manager { get; set; }

}
