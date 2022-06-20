using Api.Mappings;
using Domain.Entities.InvoiceSchedule;

namespace Api.UserFeatures.Requests
{
    public class CreateInvoiceScheduleRequest : IMapTo<InvoiceScheduleEntity>
    {
        public double Price { get; set; }
        public string Cron { get; set; }
        public int CreateDate { get; set; }
        public int PaymentDate { get; set; }
        public string Content { get; set; }
        public string InvoiceType { get; set; }
    }
}
