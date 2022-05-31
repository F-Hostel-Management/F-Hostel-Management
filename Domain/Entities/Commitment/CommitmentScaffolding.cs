using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Commitment;

public class CommitmentScaffolding : BaseEntity
{
    // 1 scaffolding M commitment
    public string Content { get; set; }
}
