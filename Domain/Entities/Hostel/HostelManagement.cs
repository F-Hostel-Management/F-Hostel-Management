﻿using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Hostel;
[Table("HostelManagents")]
public class HostelManagement : BaseEntity
{
    // M managers - M hostels
    [Column(Order = 1)]
    public Guid HostelId { get; set; }
    public HostelEntity Hostel { get; set; }
    [Column(Order = 2)]
    public Guid ManagerId { get; set; }
    public UserEntity Manager { get; set; }

}
