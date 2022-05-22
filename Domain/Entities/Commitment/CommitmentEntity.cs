using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Commitment;
public class CommitmentEntity:BaseEntity
{
    public string CommitmentCode { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Content { get; set; }

    /*navigation props*/

}
