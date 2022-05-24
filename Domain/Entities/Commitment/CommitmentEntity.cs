using Domain.Common;
using Domain.Entities.Room;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Commitment;
[Table("Commitment")]
public class CommitmentEntity : BaseEntity
{
    public string CommitmentCode { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Content { get; set; }

    /*navigation props*/

    // 1 Commitment (belong to) 1 Managers
    public Guid ManagerId { get; set; }
    public UserEntity Manager { get; set; }

    // 1 Commitment (belong to) 1 Rooms
    public Guid RoomId { get; set; }
    public RoomEntity Room { get; set; }

    // M Commitments (belong to ) M Teanants
    public virtual ICollection<CommitmentContains> CommitmentContains { get; set; }



}
