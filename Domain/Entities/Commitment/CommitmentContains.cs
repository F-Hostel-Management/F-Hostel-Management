using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Commitment;
public class CommitmentContains : BaseEntity
{
    // M Commitments (belong to ) M Teanants
    [Column(Order = 1)]
    public Guid CommitmentId { get; set; }
    public CommitmentEntity Commitment { get; set; }
    
    [Column(Order = 2)]
    public Guid TenantId { get; set; }
    public UserEntity Tenant { get; set; }
}
