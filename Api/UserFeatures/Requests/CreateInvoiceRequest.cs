using Api.Mappings;
using Domain.Entities.Invoice;
using System.ComponentModel.DataAnnotations;

namespace Api.UserFeatures.Requests
{
    public class CreateInvoiceRequest: IMapTo<InvoiceEntity>
    {
        [Required]
        public string InvoiceType { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public string Content { get; set; }

    }
}
